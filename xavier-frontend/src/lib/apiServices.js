const baseUrl = 'http://localhost:1337/api';

const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

export const loadStories = () => {
  return fetch(`${baseUrl}/Stories`)
    .then((res) => {
      const b = res.json();
      return b
    });
}

export const fetchStoryById = (storyId) => {
  console.log('loading story');
  return fetch(`${baseUrl}/Stories/${storyId}`)
    .then((res) => {
      const b = res.json();
      return b;
    });
};

export const deleteStoryById = (storyId) => {
  return fetch(`${baseUrl}/Stories/${storyId}`, {
    method: 'DELETE',
    headers: HEADERS,
  }).then(res => res.json());
}

export const createStory = (story) => {
  return fetch(`${baseUrl}/Stories`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(story),
  }).then(res => res.json());
}

export const updateStory = (story) => {
  return fetch(`${baseUrl}/Stories/${story.id}`, {
    method: 'PATCH',
    headers: HEADERS,
    body: JSON.stringify(story),
  }).then(res => res.json());
}
