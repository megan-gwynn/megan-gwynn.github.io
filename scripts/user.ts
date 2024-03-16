"use strict";

namespace core {

    export class User {

        private _displayName :string;
        private _emailAddress : string;
        private _username : string;
        private _password : string;


        constructor(displayName: string = "", emailAddress: string = "",
                    username : string = "", password : string = "") {
            this._displayName = displayName;
            this._emailAddress = emailAddress;
            this._username = username;
            this._password = password;
        }

        public get displayName() : string {
            return this._displayName;
        }

        public set displayName(value : string) {
            this._displayName = value;
        }

        public get emailAddress() :string {
            return this._emailAddress;
        }

        public set emailAddress(value : string) {
            this._emailAddress = value;
        }

        public get username() : string {
            return this._username;
        }

        public set username(value : string) {
            this._username = value;
        }

        public get password() : string {
            return this._password;
        }

        public set password(value : string) {
            this._password = value;
        }

        public toString() : string {
            return `Display Name: ${this._displayName}\n
                    Email Address: ${this._emailAddress}\n
                    Username: ${this._username}`;
        }

        public toJSON() : {Username: string; DisplayName : string; EmailAddress : string } {
            return {
                "DisplayName": this._displayName,
                "EmailAddress": this._emailAddress,
                "Username": this._username
            }
        }

        public fromJSON(data : User) : void {
            this._displayName = data.displayName;
            this._emailAddress = data.emailAddress;
            this._username = data.username;
            this._password = data.password;
        }

        /*****
         fromJSON(data) {
         if (!data) throw new Error("No data provided");

         this._displayName = data.hasOwnProperty('DisplayName') ? data.DisplayName : this._displayName;
         this._emailAddress = data.hasOwnProperty('EmailAddress') ? data.EmailAddress : this._emailAddress;
         this._username = data.hasOwnProperty('Username') ? data.Username : this._username;
         this._password = data.hasOwnProperty('Password') ? data.Password : this._password;
         }
         ******/

        public serialize() : string | null {
            if(this._displayName !== "" && this._emailAddress !== "" && this._username !== ""){
                return `${this._displayName}, ${this._emailAddress}, ${this._username}`;
            }
            console.error("One or more properties of the user object are missing or invalid");
            return null;
        }

        public deserialize(data : string) : void{
            let propertyArray = data.split(",");
            this._displayName = propertyArray[0];
            this._emailAddress = propertyArray[1];
            this._username = propertyArray[2];
        }
    }
}