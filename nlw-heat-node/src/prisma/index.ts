/* Script responsavel pela conexao com o DB */
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export default prismaClient;