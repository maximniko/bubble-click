import {Injectable} from "@angular/core";
import {TwaService} from "./twa.service";

@Injectable({providedIn: 'root'})
export class Localisation {
  messages: Messages = {}

  constructor(private twa: TwaService) {
  }

  async load(): Promise<boolean> {
    const locale = this.twa.getUserLanguageCode() ?? 'en'

    let json: any;
    try {
      const res = await fetch(`assets/messages/${locale}.json`);
      json = await res.json();
    } catch {
      const res_1 = await fetch(`assets/messages/en.json`);
      json = await res_1.json();
    }
    this.messages = json as Messages;
    return true;
  }
}

type Messages = {
  [key in Key]?: string | undefined;
}

export type Key = "Transactions"
  | "Calculations"
  | "Period"
  | "Day"
  | "Week"
  | "Month"
  | "Chart"
  | "Menu"
  | "Home"
  | "Wallet"
  | "Setting"
  | "Add"
  | "Others"
  | "sum"
  | "Spent"
  | "Available"
  | "Settings"
  | "MaxPerMonth"
  | "Edit"
  | "Save"
  | "Plan"
  | "Total"
  | "Date"
  | "Title"
  | "requiredErr"
  | "minlengthErr"
  | "maxlengthErr"
  | "minErr"
  | "maxErr"
  | "emailErr"
  | "patternErr"
  | "invalidPhoneErr"
  | "invalidTypeErr"
