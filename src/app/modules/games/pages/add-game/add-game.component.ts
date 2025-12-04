import { Component, computed, inject } from "@angular/core";
import { FormsModule, NonNullableFormBuilder, Validators, ReactiveFormsModule, FormGroup, FormControl, FormArray } from "@angular/forms";
import { injectQuery } from "@tanstack/angular-query-experimental";
import { QUERY_KEYS } from "../../../../core/constants/query-keys";
import { PlayerService } from "../../../players/services/players.service";
import { Player } from "../../../players/models/player.models";
import { toSignal } from '@angular/core/rxjs-interop';
import { GameService } from "../../services/games.service";

@Component ({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  imports: [FormsModule, ReactiveFormsModule],
})
export class AddGameComponent {
  private readonly playerService = inject(PlayerService);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly gameService = inject(GameService);

  readonly playerIdControl = this.fb.control<string>('');
  readonly selectedPlayerId = toSignal(
    this.playerIdControl.valueChanges,
    { initialValue: '' },
  );

  readonly playerGroup = (player: Player) => this.fb.group({
    id: [player.id, Validators.required],
    name: [`${player.name} ${player.last_name}`],
    points: [0],
    fouls: [0],
  });

  readonly gameGroup = this.fb.group({
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

  handleAddPlayer() {
    const player = this.selectedPlayer();
    if (!player) return;
    const group = this.playerGroup(player);
    this.gameGroup.controls.players.push(group);
    this.playerIdControl.reset();
  }

  deletePlayerGroup(idx: number) {
    this.gameGroup.controls.players.removeAt(idx);
  }

  async handleSubmit() {
    const data = this.gameGroup.getRawValue();
    await this.gameService.addGame(data);
  }

}
