export class UserInfo {
  constructor({ nameSelector, jobSelector, imageSelector }) {
    this._profileNameElement = document.querySelector(nameSelector);
    this._profileJobElement = document.querySelector(jobSelector);
    this._profileImageElement = document.querySelector(imageSelector);
    this._userId = '';
  }

  getUserInfo() {
    return {
      name: this._profileNameElement.textContent,
      job: this._profileJobElement.textContent,
      image: this._profileImageElement.src,
      userId: this._userId
    }
  }

  setUserInfo({ name, job, image, userId}) {
    this._profileNameElement.textContent = name;
    this._profileJobElement.textContent = job;
    this._profileImageElement.src = image;
    this._userId = userId;
  }
}
