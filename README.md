# wdio-facade
Facade/Wrapper utility library over WebdriverIO basic commands.
This library is dependent on gtaa-interface-ts, which is a generic TypeScript interface
with the purpose of providing an abstraction layer for automation JavaScript/TypeScript automation tools.

# Abstraction Layer
Now, what do we mean by abstraction layer? According to ISTQB TAE as well as experience working with automation tools,
they often get absolete in a couple of years or new better tools appear all the time on the market, and if we want to avoid
having to rewrite all automation projects from scratch for each new framework that will appear in the future, better just
build an abstraction layer over the tool that can be used by the business logic of TAS while designing automated test cases
and decouple the device/browser interaction from the TAS Business Logic and allow the TAE to easily replace the tool being
used with another at any moment in time, without too much impact on the previous hard work put into building the TAS.
![TAF_Design](https://user-images.githubusercontent.com/7762113/202192154-b360889e-b64a-4369-8c09-068bbdae359d.png)
