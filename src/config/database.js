//Importa prisma para emplearla para la base de datos
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default prisma;