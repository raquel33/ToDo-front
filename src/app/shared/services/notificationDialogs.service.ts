import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ISnackBarData } from "../interfaces/snackbar.interface";

@Injectable({
  providedIn: "root",
})
export class NotificationDialogsService {
  public notification$: Subject<ISnackBarData> = new Subject();

  constructor() {
    console.log("notification dialog");
  }
}
