import DummyExt from './DummyExt';

export default class Dummy extends DummyExt {

  constructor(){
    super();

  }

  greet(){
    console.log('Hello');
  }
}
