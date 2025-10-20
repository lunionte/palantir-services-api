import { createClient } from "@supabase/supabase-js";
import { fileTypeFromBuffer } from "file-type";
import { ValidationError } from "../errors/validation.error";
import { randomUUID } from "crypto";
import { InternalServerError } from "../errors/internal-server.error";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export class UploadFileService {
    constructor(private path: string = "") {}

    async upload(base64: string) {
        // tranforma a string base64 recebida para binarios
        const fileBuffer = Buffer.from(base64, "base64");

        const fileType = await fileTypeFromBuffer(fileBuffer);

        if (fileType?.mime !== "image/png" && fileType?.mime !== "image/jpeg") {
            throw new ValidationError("A extensão do arquivo é inválida");
        }

        if (!fileType) {
            throw new ValidationError("A extensão do arquivo é inválida");
        }

        const fileName = `${this.path}${randomUUID()}.${fileType.ext}`;

        const { error } = await supabase.storage.from("business").upload(fileName, fileBuffer);

        if (error) {
            throw new InternalServerError("Ocorreu um erro ao fazer upload da imagem");
        }

        const { data } = supabase.storage.from("business").getPublicUrl(fileName);
        return data.publicUrl;
    }
}
