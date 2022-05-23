interface Translation {
  translation: {
    features: {
      login: {
        components: {
          LoginForm: {
            onlyAvailableForPublicOfficers: string
            email: string
            emailEmptyErrorMsg: string
            login: string
            haveAQuestion: string
          }
        }
        LoginPage: {
          slogan: string
          copyright: string
        }
      }
    }
  }
}

export default Translation