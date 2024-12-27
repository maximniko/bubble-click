import {Injectable} from "@angular/core";
import {TwaService} from "./twa.service";
import {makeSrc} from '../extensions/String';

@Injectable({providedIn: 'root'})
export class Localisation {
  messages: Messages = {}

  constructor(private twa: TwaService) {
  }

  async load(): Promise<boolean> {
    const locale = this.twa.getUserLanguageCode() ?? 'en'

    let json: any;
    try {
      const res = await fetch(makeSrc(`assets/messages/${locale}.json`));
      json = await res.json();
    } catch {
      const res_1 = await fetch(makeSrc(`assets/messages/en.json`));
      json = await res_1.json();
    }
    this.messages = json as Messages;
    return true;
  }
}

type Messages = {
  [key in Key]?: string | undefined;
}

export type Key =
  "AlertCantFindDeposit"
  | "AlertBalanceError"
  | "Menu"
  | "Home"
  | "Wallet" // new
  | "BalanceManagement"
  | "InBank"
  | "Replenish"
  | "Withdraw"
  | "OnDeposit"
  | "NearestBonus"
  | "Deposits"
  | "PopupBankInfoTitle"
  | "PopupBankInfoContent"
  | "PopupDepositInfoTitle"
  | "PopupDepositInfoContent"
  | "PopupTurboBuyTitle"
  | "PopupTurboBuyContent"
  | "Coins"
  | "Contribution"
  | "upTo"
  | "income"
  | "AddDeposit"
  | "NewDeposit"
  | "WithdrawDeposit"
  | "bonus"
  | "Take"
  | "NoDepositsYet"
  | "max"
  | "Create"
  | "Transfer"
  | "Turbo"
  | "Level"
  | "perClick"
  | "Buy"
  | "Bought"
  | "Plan"
  | "planToLabel"
  | "Date"
  | "errRequired"
  | "errMinlength"
  | "errMaxlength"
  | "errMin"
  | "errMax"
  | "errEmail"
  | "errPattern"
  | "errInvalidPhone"
  | "errInvalidType"
