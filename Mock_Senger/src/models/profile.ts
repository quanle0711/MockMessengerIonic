export interface Profile {
    firstName: string;
    lastName: string;
    username :string;
}

export interface ProfileID extends Profile {
    id : string;
    buttonClicked: boolean;
}
