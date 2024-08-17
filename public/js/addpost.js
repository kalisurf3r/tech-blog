document.addEventListener('DOMContentLoaded', () => {
    const addPost = async (event) => {
        event.preventDefault();

        const title = document.querySelector('#title').value.trim();
        const content = document.querySelector('#textarea1').value.trim();

        if (title && content) {
            const response = await fetch('/api/blogs', {
                method: 'POST',
                body: JSON.stringify({ title, content }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                alert('Failed to add post');
            }
        }
    }

    const btn = document.querySelector('#btn');
    if (btn) {
        btn.addEventListener('click', addPost);
    } else {
        console.error('Button with class "btn" not found.');
    }
});