import { Model } from '@nozbe/watermelondb';
import { field, text } from '@nozbe/watermelondb/decorators';


export class ModelIA extends Model {
  static table = 'modelIA';



  @text('model')
  model!: string;

  @text('prepared')
  prepared!: string;

}