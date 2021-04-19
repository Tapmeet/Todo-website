
import Joi from "joi";
export const schemaFname = Joi.object().keys({
    firstname: Joi.string().required().strict(),
});
export const schemaLname = Joi.object().keys({
    lastname: Joi.string().required().strict(),
});
export const schema = Joi.object().keys({
    email: Joi.string().email({ tlds: { allow: false } })
});
export const schemaPassword = Joi.object().keys({
    password: Joi.string().min(8).required().strict(),
});
export const schemaCpass = Joi.object().keys({
    password: Joi.string().min(8).required().strict(),
    confirmpassword: Joi.string().valid(Joi.ref('password')).required().strict(),
});
export const schemaPhone = Joi.object().keys({
    phone: Joi.number().min(10).required(),
});
export const schemaSubject = Joi.object().keys({
    subject: Joi.string().required().strict(),
});
export const schemaHelp = Joi.object().keys({
    help: Joi.string().required().strict(),
});
export const schemaMessage = Joi.object().keys({
    message: Joi.string().required().strict(),
});
//const url = "http://localhost:2000/"
const url = process.env.REACT_APP_API_URL;
export const apiPath = url;
export const apiRegister = `${url}api/auth/register`;
export const apiLogin = `${url}api/auth/login`;
export const apiResetPassword = `${url}api/auth/recover`;
export const apiVerificationToken = `${url}api/auth/reset/`;
export const apiSetPassword = `${url}api/auth/reset/`;
export const apiUploadImage = `${url}api/template/add-image/upload`;
export const apiUploadMedia = `${url}api/template/add-media/upload`;
export const apiAddTemplate = `${url}api/template/add-template`;
export const apiAddBlock = `${url}api/template/add-block`;
export const apiPreviewVideo = `${url}api/template/create-videos`;
export const apigetTemplate = `${url}api/template/get-template`
export const apideleteBlock = `${url}api/template/delete-block`
export const apiSupportTicket = `${url}api/common/support`
export const apiGetUsers = `${url}api/user/`
export const apiGetUser = `${url}api/user/` 
export const apiUpdateUser = `${url}api/user/`
export const apigetUploads = `${url}api/template/get-uploads/`
export const apigetMusicUploads = `${url}api/template/get-music/`
export const apiUpdateBlock = `${url}api/template/update-scene`
export const apiMergeVideo = `${url}api/template/merge-videos`;
export const apiAddScene = `${url}api/scene/add-scene`
export const apiAllScene = `${url}api/scene/all-scenes`
export const apiUpdateScene = `${url}api/scene/`

export const apiGetScene = `${url}api/scene/get-scene/`
export const apiGetCategoryScenes = `${url}api/scene/category-scenes`

export const apiGetSceneCategories = `${url}api/category/all/`
export const apiGetSceneCategory = `${url}api/category/get-category/`
export const apiAddSceneCategory = `${url}api/category/add-category/`
export const apiUpdateSceneCategory = `${url}api/category/`

export const apiGetTemplateCategories = `${url}api/template-category/all/`
export const apiGetTemplateCategory = `${url}api/template-category/get-category/`
export const apiAddTemplateCategory = `${url}api/template-category/add-category/`
export const apiUpdateTemplateCategory = `${url}api/template-category/`

export const apiGetTemplates = `${url}api/template/all-templates`
export const apiaddAdminTemplate = `${url}api/template/create-template`
export const apigetAdminTemplate = `${url}api/template/get-admin-template`
export const apiupdateAdminTemplate = `${url}api/template/update-template/`

export const apiAddLastScene = `${url}api/last-block/add-scene`
export const apiUpdatLastScene = `${url}api/last-block/`
export const apiGetLastScene = `${url}api/last-block/get-scene/`
export const apideleteTemplate = `${url}api/template/delete-template/`
export const apideleteMedia = `${url}api/template/delete-media/`

export const apigetVideos = `${url}api/template/get-user-videos/`
export const apideleteVideos = `${url}api/template/delete-user-videos/`