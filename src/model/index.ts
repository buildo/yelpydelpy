/*

You may write here any type that you want to re-use in you application.

ex:

export type Foo = {
  bar: number
}

and in any file:

import { Foo } from 'model'

const foo: Foo = { bar: 5 }



Here we define a type `CurrentView` and two helper functions that are used
in the example app created by default:

*/

import { HistoryLocation } from 'avenger/lib/browser';

export type CurrentView = { view: 'home' } | { view: 'search'; location: string; range: number };

export function locationToView(location: HistoryLocation): CurrentView {
  switch (location.pathname) {
    case '/search':
      return {
        view: 'search',
        location: location.search.location || '',
        range: parseInt(location.search.range || '1000')
      };
    default:
      return { view: 'home' };
  }
}

export function viewToLocation(view: CurrentView): HistoryLocation {
  switch (view.view) {
    case 'home':
      return { pathname: '/', search: {} };
    case 'search':
      return {
        pathname: '/search',
        search: { location: view.location, range: String(view.range) }
      };
  }
}
