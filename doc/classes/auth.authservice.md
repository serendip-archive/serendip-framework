[Serendip Framework](../README.md) > [Auth](../modules/auth.md) > [AuthService](../classes/auth.authservice.md)

# Class: AuthService

*__internal__*: Codeblocks are great for examples

```
<my-custom-element>Highlight JS will autodetect the language</my-custom-element>
```

```typescript
// Or you can specify the language explicitly
const instance = new MyClass();
```

## Hierarchy

**AuthService**

## Implements

* [ServerServiceInterface](../interfaces/server.serverserviceinterface-1.md)

## Index

### Constructors

* [constructor](auth.authservice.md#constructor)

### Properties

* [authCodesCollection](auth.authservice.md#authcodescollection)
* [clientsCollection](auth.authservice.md#clientscollection)
* [restrictionCollection](auth.authservice.md#restrictioncollection)
* [tokenCollection](auth.authservice.md#tokencollection)
* [usersCollection](auth.authservice.md#userscollection)
* [dependencies](auth.authservice.md#dependencies)
* [events](auth.authservice.md#events)

### Methods

* [VerifyUserEmail](auth.authservice.md#verifyuseremail)
* [VerifyUserMobile](auth.authservice.md#verifyusermobile)
* [addUserToGroup](auth.authservice.md#addusertogroup)
* [authCodeValid](auth.authservice.md#authcodevalid)
* [authorizeRequest](auth.authservice.md#authorizerequest)
* [changeUserMobile](auth.authservice.md#changeusermobile)
* [clientMatchSecret](auth.authservice.md#clientmatchsecret)
* [deleteClientTokens](auth.authservice.md#deleteclienttokens)
* [deleteUserFromGroup](auth.authservice.md#deleteuserfromgroup)
* [deleteUserTokens](auth.authservice.md#deleteusertokens)
* [findAuthCode](auth.authservice.md#findauthcode)
* [findClientById](auth.authservice.md#findclientbyid)
* [findTokenByAccessToken](auth.authservice.md#findtokenbyaccesstoken)
* [findTokensByClientId](auth.authservice.md#findtokensbyclientid)
* [findTokensByUserId](auth.authservice.md#findtokensbyuserid)
* [findUserByEmail](auth.authservice.md#finduserbyemail)
* [findUserById](auth.authservice.md#finduserbyid)
* [findUserByMobile](auth.authservice.md#finduserbymobile)
* [findUserByUsername](auth.authservice.md#finduserbyusername)
* [getUsersInGroup](auth.authservice.md#getusersingroup)
* [insertToken](auth.authservice.md#inserttoken)
* [newAuthCode](auth.authservice.md#newauthcode)
* [refreshRestrictions](auth.authservice.md#refreshrestrictions)
* [registerUser](auth.authservice.md#registeruser)
* [resetMobileVerifyCode](auth.authservice.md#resetmobileverifycode)
* [sendOneTimePassword](auth.authservice.md#sendonetimepassword)
* [sendPasswordResetToken](auth.authservice.md#sendpasswordresettoken)
* [sendVerifyEmail](auth.authservice.md#sendverifyemail)
* [sendVerifySms](auth.authservice.md#sendverifysms)
* [setAuthCodeUsed](auth.authservice.md#setauthcodeused)
* [setClientSecret](auth.authservice.md#setclientsecret)
* [setNewPassword](auth.authservice.md#setnewpassword)
* [start](auth.authservice.md#start)
* [userMatchOneTimePassword](auth.authservice.md#usermatchonetimepassword)
* [userMatchPassword](auth.authservice.md#usermatchpassword)
* [configure](auth.authservice.md#configure)

### Object literals

* [options](auth.authservice.md#options)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new AuthService**(dbService: *[DbService](db.dbservice.md)*): [AuthService](auth.authservice.md)

*Defined in [src/auth/AuthService.ts:61](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L61)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| dbService | [DbService](db.dbservice.md) |

**Returns:** [AuthService](auth.authservice.md)

___

## Properties

<a id="authcodescollection"></a>

###  authCodesCollection

**● authCodesCollection**: *[DbCollectionInterface](../interfaces/db.dbcollectioninterface.md)<[AuthorizationCodeModel](auth.authorizationcodemodel.md)>*

*Defined in [src/auth/AuthService.ts:42](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L42)*

___
<a id="clientscollection"></a>

###  clientsCollection

**● clientsCollection**: *[DbCollectionInterface](../interfaces/db.dbcollectioninterface.md)<[ClientModel](auth.clientmodel.md)>*

*Defined in [src/auth/AuthService.ts:57](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L57)*

___
<a id="restrictioncollection"></a>

###  restrictionCollection

**● restrictionCollection**: *[DbCollectionInterface](../interfaces/db.dbcollectioninterface.md)<[RestrictionModel](auth.restrictionmodel.md)>*

*Defined in [src/auth/AuthService.ts:58](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L58)*

___
<a id="tokencollection"></a>

###  tokenCollection

**● tokenCollection**: *[DbCollectionInterface](../interfaces/db.dbcollectioninterface.md)<[TokenModel](auth.tokenmodel.md)>*

*Defined in [src/auth/AuthService.ts:59](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L59)*

___
<a id="userscollection"></a>

###  usersCollection

**● usersCollection**: *[DbCollectionInterface](../interfaces/db.dbcollectioninterface.md)<[UserModel](auth.usermodel.md)>*

*Defined in [src/auth/AuthService.ts:56](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L56)*

___
<a id="dependencies"></a>

### `<Static>` dependencies

**● dependencies**: *`string`[]* =  ['DbService']

*Defined in [src/auth/AuthService.ts:53](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L53)*

___
<a id="events"></a>

### `<Static>` events

**● events**: *`EventEmitter`* =  new EventEmitter()

*Defined in [src/auth/AuthService.ts:54](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L54)*

___

## Methods

<a id="verifyuseremail"></a>

###  VerifyUserEmail

▸ **VerifyUserEmail**(email: *`string`*, code: *`string`*): `Promise`<`void`>

*Defined in [src/auth/AuthService.ts:268](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L268)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| email | `string` |
| code | `string` |

**Returns:** `Promise`<`void`>

___
<a id="verifyusermobile"></a>

###  VerifyUserMobile

▸ **VerifyUserMobile**(mobile: *`string`*, code: *`string`*): `Promise`<`void`>

*Defined in [src/auth/AuthService.ts:263](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L263)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| mobile | `string` |
| code | `string` |

**Returns:** `Promise`<`void`>

___
<a id="addusertogroup"></a>

###  addUserToGroup

▸ **addUserToGroup**(userId: *`string`*, group: *`string`*): `Promise`<`void`>

*Defined in [src/auth/AuthService.ts:497](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L497)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| userId | `string` |
| group | `string` |

**Returns:** `Promise`<`void`>

___
<a id="authcodevalid"></a>

###  authCodeValid

▸ **authCodeValid**(_id: *`string`*, code: *`string`*): `Promise`<`boolean`>

*Defined in [src/auth/AuthService.ts:414](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L414)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| _id | `string` |
| code | `string` |

**Returns:** `Promise`<`boolean`>

___
<a id="authorizerequest"></a>

###  authorizeRequest

▸ **authorizeRequest**(req: *[HttpRequestInterface](../interfaces/http.httprequestinterface.md)*, controllerName: *`any`*, endpoint: *`any`*, publicAccess: *`boolean`*): `Promise`<`boolean`>

*Defined in [src/auth/AuthService.ts:172](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L172)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| req | [HttpRequestInterface](../interfaces/http.httprequestinterface.md) |
| controllerName | `any` |
| endpoint | `any` |
| publicAccess | `boolean` |

**Returns:** `Promise`<`boolean`>

___
<a id="changeusermobile"></a>

###  changeUserMobile

▸ **changeUserMobile**(userId: *`string`*, newMobile: *`string`*): `Promise`<`void`>

*Defined in [src/auth/AuthService.ts:251](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L251)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| userId | `string` |
| newMobile | `string` |

**Returns:** `Promise`<`void`>

___
<a id="clientmatchsecret"></a>

###  clientMatchSecret

▸ **clientMatchSecret**(client: *[ClientModel](auth.clientmodel.md)*, secret: *`string`*): `boolean`

*Defined in [src/auth/AuthService.ts:455](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L455)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| client | [ClientModel](auth.clientmodel.md) |
| secret | `string` |

**Returns:** `boolean`

___
<a id="deleteclienttokens"></a>

###  deleteClientTokens

▸ **deleteClientTokens**(clientId: *`string`*): `Promise`<[TokenModel](auth.tokenmodel.md)[]>

*Defined in [src/auth/AuthService.ts:490](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L490)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| clientId | `string` |

**Returns:** `Promise`<[TokenModel](auth.tokenmodel.md)[]>

___
<a id="deleteuserfromgroup"></a>

###  deleteUserFromGroup

▸ **deleteUserFromGroup**(userId: *`string`*, group: *`string`*): `Promise`<`void`>

*Defined in [src/auth/AuthService.ts:507](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L507)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| userId | `string` |
| group | `string` |

**Returns:** `Promise`<`void`>

___
<a id="deleteusertokens"></a>

###  deleteUserTokens

▸ **deleteUserTokens**(userId: *`string`*): `Promise`<[TokenModel](auth.tokenmodel.md)[]>

*Defined in [src/auth/AuthService.ts:482](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L482)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| userId | `string` |

**Returns:** `Promise`<[TokenModel](auth.tokenmodel.md)[]>

___
<a id="findauthcode"></a>

###  findAuthCode

▸ **findAuthCode**(_id: *`string`*): `Promise`<[AuthorizationCodeModel](auth.authorizationcodemodel.md)>

*Defined in [src/auth/AuthService.ts:432](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L432)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| _id | `string` |

**Returns:** `Promise`<[AuthorizationCodeModel](auth.authorizationcodemodel.md)>

___
<a id="findclientbyid"></a>

###  findClientById

▸ **findClientById**(clientId: *`string`*): `Promise`<[ClientModel](auth.clientmodel.md)>

*Defined in [src/auth/AuthService.ts:655](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L655)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| clientId | `string` |

**Returns:** `Promise`<[ClientModel](auth.clientmodel.md)>

___
<a id="findtokenbyaccesstoken"></a>

###  findTokenByAccessToken

▸ **findTokenByAccessToken**(access_token: *`string`*): `Promise`<[TokenModel](auth.tokenmodel.md)>

*Defined in [src/auth/AuthService.ts:460](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L460)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| access_token | `string` |

**Returns:** `Promise`<[TokenModel](auth.tokenmodel.md)>

___
<a id="findtokensbyclientid"></a>

###  findTokensByClientId

▸ **findTokensByClientId**(clientId: *`string`*): `Promise`<[TokenModel](auth.tokenmodel.md)[]>

*Defined in [src/auth/AuthService.ts:478](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L478)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| clientId | `string` |

**Returns:** `Promise`<[TokenModel](auth.tokenmodel.md)[]>

___
<a id="findtokensbyuserid"></a>

###  findTokensByUserId

▸ **findTokensByUserId**(userId: *`string`*): `Promise`<[TokenModel](auth.tokenmodel.md)[]>

*Defined in [src/auth/AuthService.ts:474](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L474)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| userId | `string` |

**Returns:** `Promise`<[TokenModel](auth.tokenmodel.md)[]>

___
<a id="finduserbyemail"></a>

###  findUserByEmail

▸ **findUserByEmail**(email: *`string`*): `Promise`<[UserModel](auth.usermodel.md)>

*Defined in [src/auth/AuthService.ts:664](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L664)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| email | `string` |

**Returns:** `Promise`<[UserModel](auth.usermodel.md)>

___
<a id="finduserbyid"></a>

###  findUserById

▸ **findUserById**(id: *`string`*): `Promise`<[UserModel](auth.usermodel.md)>

*Defined in [src/auth/AuthService.ts:719](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L719)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| id | `string` |

**Returns:** `Promise`<[UserModel](auth.usermodel.md)>

___
<a id="finduserbymobile"></a>

###  findUserByMobile

▸ **findUserByMobile**(mobile: *`string`*, mobileCountryCode?: *`string`*): `Promise`<[UserModel](auth.usermodel.md)>

*Defined in [src/auth/AuthService.ts:673](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L673)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| mobile | `string` |
| `Optional` mobileCountryCode | `string` |

**Returns:** `Promise`<[UserModel](auth.usermodel.md)>

___
<a id="finduserbyusername"></a>

###  findUserByUsername

▸ **findUserByUsername**(username: *`string`*): `Promise`<[UserModel](auth.usermodel.md)>

*Defined in [src/auth/AuthService.ts:708](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L708)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| username | `string` |

**Returns:** `Promise`<[UserModel](auth.usermodel.md)>

___
<a id="getusersingroup"></a>

###  getUsersInGroup

▸ **getUsersInGroup**(group: *`string`*): `Promise`<[UserModel](auth.usermodel.md)[]>

*Defined in [src/auth/AuthService.ts:521](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L521)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| group | `string` |

**Returns:** `Promise`<[UserModel](auth.usermodel.md)[]>

___
<a id="inserttoken"></a>

###  insertToken

▸ **insertToken**(opts: *`object`*): `Promise`<[TokenModel](auth.tokenmodel.md)>

*Defined in [src/auth/AuthService.ts:530](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L530)*

**Parameters:**

**opts: `object`**

| Name | Type |
| ------ | ------ |
| `Optional` clientId | `string` |
| grant_type | "one-time" \| "password" \| "client_credentials" \| "refresh_token" \| "authorization_code" |
| `Optional` userId | `string` |
| useragent | `string` |

**Returns:** `Promise`<[TokenModel](auth.tokenmodel.md)>

___
<a id="newauthcode"></a>

###  newAuthCode

▸ **newAuthCode**(token: *[TokenModel](auth.tokenmodel.md)*, clientId?: *`string`*, redirectUri?: *`string`*): `Promise`<`object`>

*Defined in [src/auth/AuthService.ts:362](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L362)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| token | [TokenModel](auth.tokenmodel.md) |
| `Optional` clientId | `string` |
| `Optional` redirectUri | `string` |

**Returns:** `Promise`<`object`>

___
<a id="refreshrestrictions"></a>

###  refreshRestrictions

▸ **refreshRestrictions**(): `Promise`<`void`>

*Defined in [src/auth/AuthService.ts:168](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L168)*

**Returns:** `Promise`<`void`>

___
<a id="registeruser"></a>

###  registerUser

▸ **registerUser**(model: *[UserRegisterRequestInterface](../interfaces/auth.userregisterrequestinterface.md)*, ip?: *`any`*, useragent?: *`any`*, confirmed?: *`boolean`*): `Promise`<[UserModel](auth.usermodel.md)>

*Defined in [src/auth/AuthService.ts:273](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L273)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| model | [UserRegisterRequestInterface](../interfaces/auth.userregisterrequestinterface.md) |
| `Optional` ip | `any` |
| `Optional` useragent | `any` |
| `Optional` confirmed | `boolean` |

**Returns:** `Promise`<[UserModel](auth.usermodel.md)>

___
<a id="resetmobileverifycode"></a>

###  resetMobileVerifyCode

▸ **resetMobileVerifyCode**(userId: *`any`*): `Promise`<`void`>

*Defined in [src/auth/AuthService.ts:349](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L349)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| userId | `any` |

**Returns:** `Promise`<`void`>

___
<a id="sendonetimepassword"></a>

###  sendOneTimePassword

▸ **sendOneTimePassword**(userId: *`any`*, useragent: *`any`*, ip: *`any`*): `Promise`<`any`>

*Defined in [src/auth/AuthService.ts:570](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L570)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| userId | `any` |
| useragent | `any` |
| ip | `any` |

**Returns:** `Promise`<`any`>

___
<a id="sendpasswordresettoken"></a>

###  sendPasswordResetToken

▸ **sendPasswordResetToken**(userId: *`string`*, useragent?: *`string`*, ip?: *`string`*): `Promise`<`any`>

*Defined in [src/auth/AuthService.ts:590](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L590)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| userId | `string` |
| `Optional` useragent | `string` |
| `Optional` ip | `string` |

**Returns:** `Promise`<`any`>

___
<a id="sendverifyemail"></a>

###  sendVerifyEmail

▸ **sendVerifyEmail**(userModel: *[UserModel](auth.usermodel.md)*): `Promise`<`any`>

*Defined in [src/auth/AuthService.ts:115](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L115)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| userModel | [UserModel](auth.usermodel.md) |

**Returns:** `Promise`<`any`>

___
<a id="sendverifysms"></a>

###  sendVerifySms

▸ **sendVerifySms**(userModel: *[UserModel](auth.usermodel.md)*, useragent?: *`string`*, ip?: *`string`*): `Promise`<`any`>

*Defined in [src/auth/AuthService.ts:142](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L142)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| userModel | [UserModel](auth.usermodel.md) |
| `Optional` useragent | `string` |
| `Optional` ip | `string` |

**Returns:** `Promise`<`any`>

___
<a id="setauthcodeused"></a>

###  setAuthCodeUsed

▸ **setAuthCodeUsed**(_id: *`string`*): `Promise`<`void`>

*Defined in [src/auth/AuthService.ts:392](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L392)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| _id | `string` |

**Returns:** `Promise`<`void`>

___
<a id="setclientsecret"></a>

###  setClientSecret

▸ **setClientSecret**(clientId: *`any`*, newSecret: *`any`*): `Promise`<`void`>

*Defined in [src/auth/AuthService.ts:637](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L637)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| clientId | `any` |
| newSecret | `any` |

**Returns:** `Promise`<`void`>

___
<a id="setnewpassword"></a>

###  setNewPassword

▸ **setNewPassword**(userId: *`any`*, newPass: *`any`*, ip?: *`string`*, useragent?: *`string`*): `Promise`<`void`>

*Defined in [src/auth/AuthService.ts:617](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L617)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| userId | `any` |
| newPass | `any` |
| `Optional` ip | `string` |
| `Optional` useragent | `string` |

**Returns:** `Promise`<`void`>

___
<a id="start"></a>

###  start

▸ **start**(): `Promise`<`void`>

*Implementation of [ServerServiceInterface](../interfaces/server.serverserviceinterface-1.md).[start](../interfaces/server.serverserviceinterface-1.md#start)*

*Defined in [src/auth/AuthService.ts:67](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L67)*

**Returns:** `Promise`<`void`>

___
<a id="usermatchonetimepassword"></a>

###  userMatchOneTimePassword

▸ **userMatchOneTimePassword**(user: *[UserModel](auth.usermodel.md)*, oneTimePassword: *`string`*): `boolean`

*Defined in [src/auth/AuthService.ts:443](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L443)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| user | [UserModel](auth.usermodel.md) |
| oneTimePassword | `string` |

**Returns:** `boolean`

___
<a id="usermatchpassword"></a>

###  userMatchPassword

▸ **userMatchPassword**(user: *[UserModel](auth.usermodel.md)*, password: *`string`*): `boolean`

*Defined in [src/auth/AuthService.ts:357](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L357)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| user | [UserModel](auth.usermodel.md) |
| password | `string` |

**Returns:** `boolean`

___
<a id="configure"></a>

### `<Static>` configure

▸ **configure**(options: *[AuthServiceOptionsInterface](../interfaces/auth.authserviceoptionsinterface.md)*): `void`

*Defined in [src/auth/AuthService.ts:43](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L43)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| options | [AuthServiceOptionsInterface](../interfaces/auth.authserviceoptionsinterface.md) |

**Returns:** `void`

___

## Object literals

<a id="options"></a>

### `<Static>` options

**options**: *`object`*

*Defined in [src/auth/AuthService.ts:49](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L49)*

<a id="options.tokenexpirein"></a>

####  tokenExpireIn

**● tokenExpireIn**: *`number`* =  1000 * 60 * 60 * 2

*Defined in [src/auth/AuthService.ts:50](https://github.com/m-esm/serendip/blob/c44cfd4/src/auth/AuthService.ts#L50)*

___

___

