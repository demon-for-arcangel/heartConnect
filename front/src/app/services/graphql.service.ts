import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  private graphUrl = environment.graphqlApiUrl;

  constructor(private http: HttpClient) { }

  executeQuery(query: string, variables: any): Observable<any> {
    const body = {
      query: query,
      variables: variables
    };
    return this.http.post<any>(this.graphUrl, body);
  }

  executeMutation(mutation: string, variables: any): Observable<any> {
    const body = {
      query: mutation,
      variables: variables
    };
    return this.http.post<any>(this.graphUrl, body);
  }

  getUserPeopleInterests(userId: number): Observable<any> {
    const query = `
      query GetUserPeopleInterests($userId: Int!) {
        userPeopleInterests(userId: $userId) {
          id
          userId
          personId
        }
      }
    `;
    const variables = { userId };
    return this.executeQuery(query, variables);
  }

  addUserPeopleInterest(userId: number, personId: number): Observable<any> {
    const mutation = `
      mutation AddUserPeopleInterest($userId: Int!, $personId: Int!) {
        addUserPeopleInterest(userId: $userId, personId: $personId) {
          userId
          personId
        }
      }
    `;
    const variables = { userId, personId };
    return this.executeMutation(mutation, variables);
  }

  deleteUserPeopleInterest(id: string): Observable<any> {
    const mutation = `
      mutation DeleteUserPeopleInterest($id: Int!) {
        deleteUserPeopleInterest(id: $id){
          success
        }
      }
    `;
    const variables = { id };
    return this.executeMutation(mutation, variables);
  }
}
