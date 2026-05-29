import { supabase } from '../lib/supabase'

interface SignUpData {
    name: string
    email: string
    password: string
    wantsToLearn: string[]
    wantsToTeach: string[]
}

export async function signUpUser(data: SignUpData) {

    const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password
    })

    if (authError) {
        throw new Error(authError.message)
    }

    if (!authData.user) {
        throw new Error('Could not create user')
    }

    const { data: profileData, error: profileError } = await supabase
        .from('users')
        .insert({
            id: authData.user.id,
            username: data.name,
            at: `@${data.name.toLowerCase().replace(/\s/g, '')}`,
            email: data.email,
            bio: '',
            profilePicture: '../src/assets/profile_picture.png',
            followers: 0,
            following: 0,
            reputation: 0,
            wantsToLearn: data.wantsToLearn,
            wantsToTeach: data.wantsToTeach
        })
        .select()
        .single()

    if (profileError) {
        throw new Error(profileError.message)
    }

    return profileData
}