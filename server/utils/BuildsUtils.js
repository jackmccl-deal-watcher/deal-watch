const BuildModel = require('../models/BuildModel.js')
const { BuildSaveError } = require('../errors/BuildsErrors.js')
const UserModel = require('../models/UserModel.js')

// Saves build, throws error if build name already taken or logged in user not found
const saveBuild = async (build, user) => {
    if (!build.title) {
        throw new BuildSaveError(`Build title required to toggle save!`)
    }
    if (!user) {
        throw new BuildSaveError(`No user logged in!`)
    }
    const loggedInUser = await UserModel.findOne({ 'username': user })
    if (!loggedInUser) {
        throw new BuildSaveError(`Logged in user ${user} not found!`)
    }
    const oldBuild = await BuildModel.findOne({ 'title': build.title, 'user': loggedInUser.id })
    if (oldBuild) {
        throw new BuildSaveError(`Build name ${build.title} already used!`)
    }
    build.user = loggedInUser.id
    const newBuild = await BuildModel.create(build)
    if (newBuild) {
        return { 'status': 'success', 'message': `Build ${build.title} successfully saved!`, 'saved_build': newBuild }
    } else {
        throw new BuildSaveError(`Failed to save build ${build.title}!`)
    }
}

// Un-saves build, throws error if build name not found or logged in user not found
const unSaveBuild = async (build, user) => {
    if (!build.title) {
        throw new BuildSaveError(`Build title required to toggle save!`)
    }
    if (!user) {
        throw new BuildSaveError(`No user logged in!`)
    }
    const loggedInUser = await UserModel.findOne({ 'username': user })
    if (!loggedInUser) {
        throw new BuildSaveError(`Logged in user ${user} not found!`)
    }
    const deleteResult = await BuildModel.deleteOne({ 'title': build.title, 'user': loggedInUser.id } )
    if (deleteResult) {
        return { 'status': 'success', 'message': `Build ${build.title} successfully un-saved!` }
    } else {
        throw new BuildSaveError(`Failed to un-save build ${build.title}!`)
    }
}

// Un-saves build, throws error if build name not found or logged in user not found
const getSavedBuilds = async (user) => {
    if (!user) {
        throw new BuildSaveError(`No user logged in!`)
    }
    const loggedInUser = await UserModel.findOne({ 'username': user })
    if (!loggedInUser) {
        throw new BuildSaveError(`Logged in user ${user} not found!`)
    }
    const savedBuilds = await BuildModel.find({ 'user': loggedInUser.id } )
    if (savedBuilds) {
        return savedBuilds
    } else {
        throw new BuildSaveError(`Failed to retrieve saved builds for ${user}!`)
    }
}

module.exports = { saveBuild, unSaveBuild, getSavedBuilds }