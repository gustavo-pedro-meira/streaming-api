import { IsNotEmpty, IsUUID } from "class-validator";

export class AddFavoriteDto {
    @IsUUID()
    @IsNotEmpty()
    mediaId: string;
}