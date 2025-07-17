import { Major } from '@prisma/client';

// Um tipo DTO, que deixa claro quais os dados serão trafegados entre o cliente (browser) e o servidor
export type CreateMajorDTO = Pick<Major, 'name' | 'code' | 'description'>;

// o Pick é um tipo que seleciona apenas os campos que queremos
// o Omit é um tipo que remove os campos que não queremos
// o Partial cria um tipo a partir do Major, mas com todos os campos opcionais
