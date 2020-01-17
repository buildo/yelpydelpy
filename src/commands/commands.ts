/*

In this file we can define all the avenger commands that are needed in our app.

*/

//import { command } from 'avenger';
import { getDoUpdateCurrentView } from 'avenger/lib/browser';
//import { taskEither } from 'fp-ts/lib/TaskEither';
import { viewToLocation } from '../model';

export const doUpdateCurrentView = getDoUpdateCurrentView(viewToLocation);
