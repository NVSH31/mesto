import { profileNameElement, profileJobElement} from './constants.js';

export class UserInfo {
  constructor({ name, job} = { name: 'Имя', job: 'Работа' }) {
    this._name = name;
    this._job = job;
  }

  getUserInfo() {
    return {
      name: this._name,
      job: this._job,
    }
  }

  setUserInfo({ name, job}) {
    this._name = name,
    this._job = job
    profileNameElement.textContent = this._name;
    profileJobElement.textContent = this._job;
  }
}
