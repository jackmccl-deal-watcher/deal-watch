const BuildModel = require('../models/UserModel.js')
const { BuildSaveError } = require('../errors/BuildsErrors.js')

// Returns user by username, otherwise returns null
// const getUser = async (username) => {
//     let user = await UserModel.findOne({ 'username': username }, 'username password')
//     return user
// }

// Saves build, throws error if build name already taken
const saveBuild = async (build) => {
    if (!build.title) {
        throw new BuildSaveError(`Build title required!`)
    }
    let retrievedBuild = await BuildModel.findOne({ 'name': build.title })
    if (retrievedBuild) {
        throw new BuildSaveError(`Build ${build.title} already exists!`)
    }
    const newBuild = new BuildModel()
    newBuild = build
    await newBuild.save()
    return newBuild
}

module.exports = { saveBuild }