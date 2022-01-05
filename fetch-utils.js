const SUPABASE_URL = 'https://osvbnemrpkxnsdboazbe.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTUwODkwMywiZXhwIjoxOTU1MDg0OTAzfQ.WbfpkieH6xyID6pt237Vr_Y78Fs1wnkmUdHXoHg5twU';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function updateName(name) {
    const user = getUser();

    const response = await client
        .from('cities')
        .update({ name: name })
        .match({ user_id: user.id });
console.log(response);
    return checkError(response);
}

export async function getCity() {
    const response = await client
        .from('cities')
        .select()
        .single();

    return checkError(response);
}


export async function getUser() {
    return client.auth.session();
}


export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./other-page');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '/';
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
