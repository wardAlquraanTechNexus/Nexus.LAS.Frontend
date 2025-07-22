import { CreatePersonCommand } from "./create-person";

export interface UpdatePersonCommand extends CreatePersonCommand{
    id:number;
}