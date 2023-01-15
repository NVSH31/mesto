export class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._profileNameElement = document.querySelector(nameSelector);
    this._profileJobElement = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      name: this._profileNameElement.textContent,
      job: this._profileJobElement.textContent
    }
  }

  setUserInfo({ name, job}) {
    this._profileNameElement.textContent = name;
    this._profileJobElement.textContent = job;
  }
}
