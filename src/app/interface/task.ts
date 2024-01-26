export interface Itask {
  state: string;
  estado: string;
  id: number | string;
  title: string;
  description: string;
  date: string; // Asegúrate de que el tipo de dato sea correcto
  done: boolean;
  inProgress?: boolean; // Añade esta línea si necesitas la propiedad
}
