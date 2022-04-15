'use strict';

const addCameraForm = document.querySelector('#addCamera');
const addLensForm = document.querySelector('#addLens');
const parser = new DOMParser();
const cameraRow = document.querySelector('.camera-row');
const lensRow = document.querySelector('.lens-row');
const plusBtn = document.querySelector('.plus-btn');
const addCameraBtn = document.querySelector('.add-camera-btn');
const addLensBtn = document.querySelector('.add-lens-btn');
const formContainer = document.querySelector('.form-container');
const cameraForm = document.querySelector('.camera-form');
const lensForm = document.querySelector('.lens-form');
const msg = document.querySelector('.msg');

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

const hideForm = () => {
  formContainer.classList.add('d-none');
  cameraForm.classList.add('d-none');
  lensForm.classList.add('d-none');
};

const submitFormData = async (apiAddress, form) => {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(apiAddress, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const d = await response.json();
    return d.msg;
  } catch (err) {
    return err;
  }
};

const createList = node => {
  let list = '';
  const notAllowed = ['brand', 'name', undefined];
  node.childNodes.forEach(child => {
    if (!notAllowed.includes(child.tagName))
      list += `<li>${child.tagName}: ${child.innerHTML}</li>`;
  });
  return list;
};

const createCameraCard = node => {
  const cardHtml = `
  <div class="card col-lg-3 shadow">
    <div class="card-body">
      <h5 class="card-title">${node.querySelector('brand').innerHTML}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${
        node.querySelector('name').innerHTML
      }</h6>
      <p class="card-text">
        <ul>
        ${createList(node)}
        </ul>
      </p>
    </div>
  </div>`;
  cameraRow.insertAdjacentHTML('beforeend', cardHtml);
  return cardHtml;
};

const createLensCard = node => {
  const cardHtml = `
  <div class="card col-lg-3 shadow">
    <div class="card-body">
    <h5 class="card-title">${node.querySelector('brand').innerHTML}</h5>
      <p class="card-text">
        <ul>
          ${createList(node)}
        </ul>
      </p>
    </div>
  </div>`;
  lensRow.insertAdjacentHTML('beforeend', cardHtml);
  return cardHtml;
};

const initView = data => {
  cameraRow.innerHTML = '';
  lensRow.innerHTML = '';
  hideForm();
  const doc = parser.parseFromString(data, 'text/xml');
  const cameras = doc.querySelectorAll('camera');
  const lenses = doc.querySelectorAll('lens');
  cameras.forEach(c => createCameraCard(c));
  lenses.forEach(l => createLensCard(l));
};

const fetchXmlData = async function () {
  fetch('https://mycamerasapi.herokuapp.com/collection')
    .then(response => response.text())
    .then(data => initView(data))
    .catch(err => alert(err));
};

const emptyInputFields = form => {
  form
    .querySelectorAll('input[type=text]')
    .forEach(input => (input.value = ''));
};

const showResponse = response => {
  msg.textContent = response;
  msg.classList.add('show-msg');
  delay(2000).then(() => msg.classList.remove('show-msg'));
};

///////////////// Eventlisteners

addCameraForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  const response = await submitFormData(
    'https://mycamerasapi.herokuapp.com/addcamera',
    this
  );

  hideForm();
  emptyInputFields(this);
  fetchXmlData();
  showResponse(response);
});

addLensForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  const response = await submitFormData(
    'https://mycamerasapi.herokuapp.com/addlens',
    this
  );

  hideForm();
  emptyInputFields(this);
  fetchXmlData();
  showResponse(response);
});

plusBtn.addEventListener('mouseenter', e => {
  addCameraBtn.classList.remove('hidden-btn');
  delay(100).then(() => addLensBtn.classList.remove('hidden-btn'));
});

plusBtn.parentElement.addEventListener('mouseleave', e => {
  addCameraBtn.classList.add('hidden-btn');
  delay(100).then(() => addLensBtn.classList.add('hidden-btn'));
});

addCameraBtn.addEventListener('click', e => {
  formContainer.classList.remove('d-none');
  cameraForm.classList.remove('d-none');
});

addLensBtn.addEventListener('click', e => {
  formContainer.classList.remove('d-none');
  lensForm.classList.remove('d-none');
});

formContainer.addEventListener('click', e => {
  e.stopPropagation();
  if (e.target === formContainer) {
    formContainer.classList.add('d-none');
    cameraForm.classList.add('d-none');
    lensForm.classList.add('d-none');
  }
});

// initialize page
fetchXmlData();
