const baseUrl = process.env.REACT_APP_BASE_URL

const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

export const loadStories = () => {
  return fetch(`${baseUrl}/Stories?filter[order]=createdAt DESC`)
    .then((res) => res.json());
};

export const fetchStoryById = (storyId, access_token='') => {
  console.log('loading story');
  return fetch(`${baseUrl}/Stories/${storyId}?access_token=${access_token}`)
    .then((res) => {
      const b = res.json();
      return b;
    });
};

export const deleteStoryById = (storyId, access_token='') => {
  return fetch(`${baseUrl}/Stories/${storyId}?access_token=${access_token}`, {
    method: 'DELETE',
    headers: HEADERS,
  })
    .then(
      res => loadStories(),
      error => error
    );
};

export const createStory = (story, access_token='') => {
  return fetch(`${baseUrl}/Stories?access_token=${access_token}`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(story),
  })
    .then(
      res => loadStories(),
      error => error
    );
};

export const login = (email, password) => {
  return fetch(`${baseUrl}/Users/login`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({email: email, password: password}),
  }).then(res => res.json());
};

export const logout = (access_token='') => {
  return fetch(`${baseUrl}/Users/logout?access_token=${access_token}`, {
    method: 'POST',
    headers: HEADERS,
  });
};

export const updateStory = (story, access_token='') => {
  return fetch(`${baseUrl}/Stories/${story.id}?access_token=${access_token}`, {
    method: 'PATCH',
    headers: HEADERS,
    body: JSON.stringify(story),
  })
    .then(
      res => loadStories(),
      error => error
    );
};
