import {tableSchema} from "@nozbe/watermelondb";

export const modelSchema = tableSchema({
  name: 'modelIA',
  columns: [
    {
      name: 'model',
      type: 'string',
      isIndexed: true
    },
      {
          name:'prepared',
          type: 'string',
      },

  ],
});