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

  deleteUserPeopleInterest(id: number): Observable<any> {
    const mutation = `
      mutation DeleteUserPeopleInterest($id: Int!) {
        deleteUserPeopleInterest(id: $id) {
          success
          message
        }
      }
    `;
    const variables = { id };
    return this.executeMutation(mutation, variables);
  }

  getListFriends(id_user: number): Observable<any> {
    const query = `
      query GetListFriends($id_user: Int!) {
        getListFriends(id_user: $id_user) {
          id
          id_user
          id_friendship
        }
      }
    `;
    const variables = { id_user };
    return this.executeQuery(query, variables);
  }

  deleteUserFriends(id: number): Observable<any> {
    const mutation = `
      mutation DeleteUserFriendShip($id: Int!) {
        deleteUserFriendShip(id: $id) {
          success
          message
        }
      }
    `;
    const variables = { id };
    return this.executeMutation(mutation, variables);
  }
}