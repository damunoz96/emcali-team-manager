import { Component, computed, effect, inject, input, numberAttribute } from "@angular/core";
import { FormsModule, NonNullableFormBuilder, Validators, ReactiveFormsModule, FormGroup, FormControl, FormArray, NumberValueAccessor } from "@angular/forms";
import { injectQuery } from "@tanstack/angular-query-experimental";
import { QUERY_KEYS } from "../../../../core/constants/query-keys";
import { PlayerService } from "../../../players/services/players.service";
import { Player } from "../../../players/models/player.models";
import { toSignal } from '@angular/core/rxjs-interop';
import { GameService } from "../../services/games.service";
import { StatsService } from "../../../../core/services/stats.service";
import { DatePipe, Location } from "@angular/common";
import { toast } from "ngx-sonner";

@Component ({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  imports: [FormsModule, ReactiveFormsModule],
  providers: [DatePipe],
})
export class AddGameComponent {
  private readonly playerService = inject(PlayerService);
  private readonly gameService = inject(GameService);
  private readonly statsService = inject(StatsService);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly datePipe = inject(DatePipe);

  readonly gameId = input.required({transform: numberAttribute, alias:'id'});

  readonly isEditMode = computed(()=> !!this.gameId());

  readonly playerIdControl = this.fb.control<string>('');
  readonly selectedPlayerId = toSignal(
    this.playerIdControl.valueChanges,
    { initialValue: '' },
  );

  readonly playerGroup = (player: Player, points?:number, fouls?:number) => this.fb.group({
    id: [player.id, Validators.required],
    name: [`${player.name} ${player.last_name}`],
    points: [points ?? 0],
    fouls: [fouls ?? 0],
  });

  readonly gameGroup = this.fb.group({
    id: this.fb.control<number | undefined>(undefined),
    score: [0, [Validators.required, Validators.min(0)]],
    opponent_score: [0, [Validators.required, Validators.min(0)]],
    opponent: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    location: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(20)]],
    date: ['', Validators.required],
    players: this.fb.array<ReturnType<typeof this.playerGroup>>([]),
  }, {
    validators: (form) => {
      const scoreControl = form.get('score') as FormControl<number>;
      const playersControl = form.get('players') as FormArray<ReturnType<typeof this.playerGroup>>;
      const score = scoreControl.value;
      const players = playersControl.value;
      const totalPoints = players.reduce((total, player) => total + (player.points ?? 0), 0);
      if (score !== totalPoints) return { invalidPoints: true };
      return null;
    },
  });

  readonly selectedPlayer = computed(() => {
    const playerId = this.selectedPlayerId();
    const players = this.players.data();
    return players?.find((p) => p.id === Number(playerId));
  });

  readonly players = injectQuery(() => ({
    queryKey:[QUERY_KEYS.PLAYERS_DATA],
    queryFn: async () => await this.playerService.getAllPlayersData()
  }));

  readonly game = injectQuery(() => ({
    queryKey: [QUERY_KEYS.GAME, this.gameId()],
    queryFn: () =>this.gameService.getGame(this.gameId()),
    enabled: this.isEditMode()
  }))

  readonly stats = injectQuery (() => ({
    queryKey: [QUERY_KEYS.GAME_PLAYERS, this.gameId()],
    queryFn: () => this.statsService.getGamePlayers(this.gameId()),
    enabled: this.isEditMode()
  }))


  constructor (private location: Location) {
    effect (()=>{
      const game = this.game.data();
      const stats = this.stats.data();
      const formattedDate = this.datePipe.transform(game?.created_at, 'yyyy-MM-dd');
      if (!game || !stats) return;
      this.gameGroup.reset({
        id: game.id,
        score: game.score,
        opponent: game.opponent,
        opponent_score: game.opponent_score,
        location: game.location,
        date: formattedDate || '',
      });
      this.stats.data()?.forEach(({stats, ...player}) => {
        const group = this.playerGroup(player, stats.points, stats.fouls);
        this.gameGroup.controls.players.push(group);
      });
    })
  }

  goBack () {
    this.location.back()
  }

  handleAddPlayer() {
    const player = this.selectedPlayer();
    if (!player) return;
    const playerAlreadyAdded = this.gameGroup.controls.players.controls.some(
      (control) => control.value.id === player.id
    );

    if (playerAlreadyAdded) {
      toast.error('El jugador ya ha sido agregado');
      return;
    }
    const group = this.playerGroup(player);
    this.gameGroup.controls.players.push(group);
    this.playerIdControl.reset();
  }

  deletePlayerGroup(idx: number) {
    this.gameGroup.controls.players.removeAt(idx);
  }

  async handleSubmit() {
    const data = this.gameGroup.getRawValue();
    data.id ??= undefined;
    try {
      await this.gameService.addGame(data);
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      toast.success('Game successfully edited!');
      this.goBack();
    }
  }

}
