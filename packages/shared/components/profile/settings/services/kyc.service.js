import $script from "scriptjs";
import profileApi from "shared/services/api-client/profile-api";
import authService from "shared/services/auth-service";

export const loadKycIFrame = () => {
  const authorization = authService.getAuthArg();

  $script(process.env.REACT_APP_IDENSIC_SRC, function() {
    if (!window.idensic.init) return;
    profileApi.verificationToken(authorization).then(data => {
      window.idensic.init(
        // selector of an IFrame container (see above)
        "#idensic",
        // configuration object (see preparation steps)
        {
          accessToken: data,
          excludedCountries: ["USA"],
          lang: "en",
          applicantDataPage: {
            enabled: true,
            fields: [
              {
                name: "firstName",
                required: true
              },
              {
                name: "lastName",
                required: true
              },
              {
                name: "email",
                required: true
              },
              {
                name: "phone",
                required: true
              },
              {
                name: "country",
                required: true
              }
            ]
          },
          requiredDocuments: "IDENTITY:PASSPORT,ID_CARD,DRIVERS;SELFIE:SELFIE",
          uiConf: {
            customCssUrl: "https://genesis.vision/assets/kyc/style.css?v=1",
            steps: {}
          }
        },
        // function for the IFrame callbacks
        function(messageType, payload) {
          // just logging the incoming messages
          console.log("[IDENSIC DEMO] Idensic message:", messageType, payload);
        }
      );
    });
  });
};
