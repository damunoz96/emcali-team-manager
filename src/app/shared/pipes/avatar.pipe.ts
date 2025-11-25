import { Pipe, PipeTransform } from "@angular/core";
import { createAvatar } from '@dicebear/core';
import { funEmoji } from '@dicebear/collection';

@Pipe({
  name: 'avatar'
})
export class AvatarPipe implements PipeTransform {
  transform(seed: string | number) {
    seed = typeof seed === 'number' ? seed.toString() : seed;
    return createAvatar(funEmoji, { seed }).toDataUri();
  }
}
