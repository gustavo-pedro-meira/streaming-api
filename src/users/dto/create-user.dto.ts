import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsUUID()
    mediaId: string;
}
