import { CreatePersonCommand } from "../person-models/create-person";

export interface UpdatePersonCommand extends CreatePersonCommand{
    id:number,
    personStatus:number,
    private:boolean
}