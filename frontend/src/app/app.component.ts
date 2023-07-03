import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [HttpClientModule]
})
export class AppComponent {
  constructor(private httpClient: HttpClient) {
  }

  textMessageInput = '';
  serverMessage = this.httpClient.get<{message: string}>("api/message");

  saveMessage(message: String) {
    this.httpClient.post<any>("api/message", { message: message }).subscribe(
      next => this.serverMessage = this.httpClient.get<{message: string}>("api/message")
    );
  }
}
