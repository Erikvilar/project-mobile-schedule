import { NoteRepository } from '@/database/repository/NoteRepository.ts';

export class CommandService {
  public ListCommands() {
    return [
      {
        id: 1,
        command: 'note-list',
        name: '> liste todas notas: ',
        surname: 'Listar notas',
        placeHolderInfo: '',
      },
      {
        id: 2,
        command: 'note-create',
        name: '> criar nota: ',
        surname: 'Criar nota',
        placeHolderInfo: '',
      },
      {
        id: 3,
        command: 'note-delete',
        name: '> deletar nota: ',
        surname: 'Deletar nota',
        placeHolderInfo: '',
      },
      {
        id: 4,
        command: 'note-read',
        name: '> ler nota : ',
        surname: 'Ler nota',
        placeHolderInfo: '',
      },
    ];
  }




}