module.exports = ({ env }) => ({
    // ...
    email: {
      config: {
        provider: 'sendgrid',
        providerOptions: {
          apiKey: env('SENDGRID_API_KEY'),
        },
        settings: {
          defaultFrom: 'bastiengilouxx@gmail.com',
          defaultReplyTo: 'bastiengilouxx@gmail.com',
        },
      },
    },
    // ...
  });