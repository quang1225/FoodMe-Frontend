import { Typography } from '@mui/material';
import Link from 'next/link';
import {
  Block,
  ContainerPage,
  Content,
  TitleBlock,
  TitlePage,
} from './stylesPolicy';

export default function PrivacyPolicyContainer() {
  return (
    <ContainerPage>
      <TitlePage className="title-font">Terms of Use</TitlePage>
      <Block>
        <Content>Welcome to FoodMe.</Content>
        <Content>
          The following terms and our Privacy Policy at{' '}
          <Link href="/privacy-policy">
            <a>https://www.food.me/privacy-policy</a>
          </Link>{' '}
          (together, the <b>‘Terms’</b>) are a legal contract between{' '}
          <b>Food Me Pty Limited ACN 653 479 531</b> (referred to here as{' '}
          <b>‘FoodMe’, ‘we’, ‘our’</b> or <b>‘us’</b>) and you, the owner or
          operator (or legal representative) of a retail food business who has
          signed up for services offered via our web app (referred to here as
          the <b>‘Business User’, ‘you’, ‘your’</b>).
        </Content>
        <Content>
          These Terms govern your use of this web app and any related
          technology, content, products or services offered to Business Users
          via this web app (collectively referred to as the <b>Services</b>).
        </Content>
        <Content>
          Please read these Terms carefully before using the web app or the
          Services. They contain important information about your legal rights
          and limitations on those rights. If you do not agree to any of these
          Terms, you are not authorised to access or use any Services and you
          should stop using this web app immediately.
        </Content>
        <Content>
          These Terms may change from time to time. We will notify you of
          material changes to these Terms, either by email or by posting a
          notice on the web app.
        </Content>
        <Content>
          By continuing to access the web app and use the Services, you
          acknowledge that you have read and agree to these Terms (as amended
          from time to time).
        </Content>
      </Block>
      <Block>
        <TitleBlock className="title-font">Our Services</TitleBlock>
        <Content>
          This web app provides a technology platform from which users
          (customers or potential customers) can search for and select menu
          options from restaurants and other retail food outlets <b>(Venue)</b>,
          according to their personal preferences or dietary requirements. Our
          web app links customers directly to the website of the Business they
          select from search results. Customers can then contact the Venue
          directly, to place an order, make a reservation, order delivery
          services, or find out more about the products or services offered by
          the Venue.
        </Content>
        <Content>
          We also offer tools to help Business Users who own or operate a Venue
          to engage with Customers through Services offered via the web app.
          Business Users can manage and communicate their menu via the FoodMe
          Discover restaurant directory at{' '}
          <a href="https://food.me" target="_blank" rel="noreferrer">
            www.food.me
          </a>
          . They can also manage a rich profile including photos, description
          and location. Optionally, Business Users can choose to host their
          custom branded site via the FoodMe web app.
        </Content>
      </Block>
      <Block>
        <TitleBlock className="title-font">Content</TitleBlock>
        <Content>
          The information, data, code, text, images, audio, video or other
          material accessible from this web app <b>(Content)</b> is provided for
          the convenience and general information of users.
        </Content>
        <Content>
          The Content is owned by or licensed to FoodMe. Copying, transmitting,
          reproducing or otherwise using any of the Content is prohibited except
          with the prior written consent of FoodMe. To request permission,
          please contact us at <a>hello@food.me</a>.
        </Content>
        <Content>
          Whilst our aim is to minimise technical errors and ensure that the web
          app functions correctly, we cannot guarantee this. FoodMe is not
          liable for any technical errors or breakdowns on the web app from time
          to time.
        </Content>
      </Block>

      <Block>
        <TitleBlock className="title-font">
          Access to the web app and Services
        </TitleBlock>
        <Content>
          You may access and view some Content on the web app without
          registering. However, you will not be able to access and use any of
          the Services offered specifically to Business Users unless you sign up
          for an account.
        </Content>
      </Block>

      <Block>
        <TitleBlock className="title-font">Registration</TitleBlock>
        <Content>
          To access the Services, you will need to create an account. If you
          register an account as the representative on behalf of a business
          entity, you warrant that you are properly authorised to do so.
        </Content>
        <Content>
          When you create an account, you must provide complete and accurate
          information and keep that information up-to-date at all times. You are
          responsible for all use and activity carried out on or from your
          account If you notice any unauthorised use or other security breach of
          your account, you must notify us by email immediately to{' '}
          <a>hello@food.me</a>.
        </Content>
        <Content>
          We handle any personal information you give us in accordance with our
          Privacy Policy at{' '}
          <Link href="/privacy-policy">
            <a>https://www.food.me/privacy-policy</a>
          </Link>
          .
        </Content>
        <Content>
          To create an account, you must be:
          <ul>
            <li>at least 18 years of age; and</li>
            <li>
              an individual or entity, or legal representative of an entity,
              carrying on a retail food business in Australia; and
            </li>
            <li>
              authorised to enter into a legally binding agreement with us on
              these Terms and on any other terms applicable to the Services; and
            </li>
            <li>
              promise to use the web app and the Services in accordance with
              these Terms.
            </li>
          </ul>
        </Content>
        <Content>
          We may ask you to provide more information or documentation to support
          your application for an account. We reserve the right to suspend or
          cancel your registration if we are not satisfied that you have met
          these requirements or if you breach these Terms.
        </Content>
      </Block>

      <Block>
        <TitleBlock className="title-font">Subscription Services</TitleBlock>
        <Content>
          The Services available to Business Users via the web app are paid
          services offered by subscription on a month-to-month basis{' '}
          <b>(Subscription Services)</b>. When you sign up for Subscription
          Services, you agree to pay the Subscription Fee published on the web
          app (including any applicable taxes), which gives you access to the
          Subscription Services for one month. You may renew the Subscription
          Service either by a recurring monthly payment or by a single payment
          for a specified period of months.
        </Content>
        <Content>
          You may cancel the Subscription Service at any time. You will be
          entitled to use the Services until the end of the month for which you
          have paid the Subscription Fee.
        </Content>
        <Content>
          Alternatively, your Subscription Service will automatically terminate
          if you stop paying the Subscription Fee.
        </Content>
        <Content>
          When you sign up for or renew a Subscription Service, you will be
          directed to a third-party payment platform to pay the Subscription
          Fee.
        </Content>
        <Content>
          The terms on which Subscription Services are offered to Business Users
          may change from time to time. FoodMe will notify you of any changes
          via the web app on at least 30 days’ notice.
        </Content>
      </Block>

      <Block>
        <TitleBlock className="title-font">Refunds</TitleBlock>
        <Content>
          You have 14 days after the date of purchase or renewal of your
          Subscription Service to request a full refund. After this period, no
          refunds are available. To request a refund, please contact us at{' '}
          <a>hello@foodme.com</a>.
        </Content>
      </Block>

      <Block>
        <TitleBlock className="title-font">Privacy</TitleBlock>
        <Content>
          By accessing and using this web app or the Services, you consent to
          and agree to comply with our Privacy Policy at{' '}
          <Link href="/privacy-policy">
            <a>https://www.food.me/privacy-policy</a>
          </Link>{' '}
          which explains how we collect, use and protect the personal
          information you provide to us.
        </Content>
        <Content>
          You also agree to comply with any data protection laws applicable to
          you or your business, including the Privacy Act 1988 (Cth) and the
          SPAM Act 2003 (Cth).
        </Content>
      </Block>

      <Block>
        <TitleBlock className="title-font">
          Notices and communications
        </TitleBlock>
        <Content>
          you register an account. These communications may include requests for
          verification, reminders, receipts, updates, and marketing or
          promotional material, and may be in the form of emails, SMS or
          messages posted to your account page.
        </Content>
        <Content>
          You may opt out of any of these forms of communication by contacting
          us at <a>hello@food.me</a>.
        </Content>
      </Block>

      <Block>
        <TitleBlock className="title-font">Third-party websites</TitleBlock>
        <Content>
          Our web app contains links to websites of Venues and other third
          parties. Those links are provided solely for the information and
          convenience of users. Except to the extent expressly disclosed by us,
          we do not in any way approve, recommend or endorse those sites or the
          information, products or services accessible on them.
        </Content>
        <Content>
          These websites are owned and operated by independent third parties.
          These Terms do not apply to those sites. When users link to external
          websites, they will leave this web app and will be subject to the
          terms and conditions of the external site.
        </Content>
        <Content>
          FoodMe has no control over and is not responsible for any content,
          products or services accessible from third party websites. Your
          interaction with third-party websites is entirely at your own risk.
        </Content>
      </Block>

      <Block>
        <TitleBlock className="title-font">Your User Content</TitleBlock>
        <Content>
          Registered Business Users are able to contribute content{' '}
          <b>(User Content)</b> to the web app when using the Services.
        </Content>
        <Content>
          You represent and warrant that:
          <ol>
            <li>your User Content is not proprietary or confidential;</li>
            <li>you own or are authorised to publish your User Content; and</li>
            <li>
              any User Content you make available on the web app is accurate,
              up-to-date and not misleading, including any statements or
              material you make available regarding:
              <ul>
                <li>
                  any dietary, nutritional or health-related information about
                  the products or services you offer;
                </li>
                <li>
                  the contents of products you offer, in particular, whether the
                  products contain or may contain gluten, nuts, dairy or other
                  allergens;
                </li>
                <li>
                  whether products or services you offer conform with standards
                  or criteria (e.g. halal, kosher, vegan, non-GMO, etc); and
                </li>
              </ul>
            </li>
          </ol>
        </Content>
        <Content>
          Although we have no obligation to monitor User Content, we reserve the
          right to remove or alter any User Content that breaches any of these
          Terms. However, we take no responsibility and assume no liability for
          any User Content. You are solely liable for the User Content you make
          available on the web app and for any action taken, or not taken, by a
          Customer on the basis of your User Content.
        </Content>
        <Content>
          You grant FoodMe and its affiliated companies a worldwide,
          non-exclusive, royalty-free, transferable, irrevocable, perpetual
          licence with rights to sub-licence and to use, reproduce, modify,
          adapt, publish and publicly display your User Content in any media and
          for any reason, including to promote and provide the Services, without
          attribution to you.
        </Content>
      </Block>

      <Block>
        <TitleBlock className="title-font">
          Intellectual property rights
        </TitleBlock>
        <Content>
          This web app contains material which is owned by or licensed to us.
          The source code, video, text, software, images, audio, graphics and
          other Content, including the design, layout and appearance of those
          materials, are protected by copyright, trademark and other laws.
          Copying, reproducing, distributing, modifying, decompiling or
          reverse-engineering any of that material without our written
          permission is prohibited and may result in civil or criminal
          penalties.
        </Content>
        <Content>
          Subject to you complying with these Term, FoodMe grants you a limited,
          non-exclusive, revocable, non-transferrable licence to access and use
          the web app and Services made available to you.
        </Content>
        <Content>
          We may make software updates to those Services, which you will have to
          install to continue using the Services. Any software updates may be
          subject to additional terms and conditions.
        </Content>
      </Block>

      <Block>
        <TitleBlock className="title-font">User restrictions</TitleBlock>
        <Content>
          As a condition of accessing and using our web app or any Services, you
          must not:
          <ol>
            <li>
              do anything in breach of any applicable laws, regulations, codes
              and standards;
            </li>
            <li>
              provide or upload false or misleading information, create a false
              identify or use or attempt to use another person’s account;
            </li>
            <li>hack into any part of the web app;</li>
            <li>
              knowingly introduce a virus, Trojan, worm, logic bomb, spyware,
              malware or other similar material;
            </li>

            <li>
              act in any manner that negatively impacts other users, including
              through a denial-of-service attack or a distributed
              denial-of-service attack;
            </li>
            <li>
              upload files that contain viruses that may cause damage to our
              property or the property of others;
            </li>
            <li>
              do anything which may impair or damage our or a third party's
              systems or network security;
            </li>
            <li>
              transmit any unsolicited advertising, marketing or other
              promotional materials other than those made available by FoodMe,
              unless authorised by us in writing;
            </li>
            <li>
              attempt to modify, reverse engineer or reverse-assemble any part
              of the web app;
            </li>

            <li>
              do anything that would constitute a breach of a person’s privacy
              or other legal rights;
            </li>
            <li>
              communicate false, disparaging or defamatory information about any
              person;
            </li>
            <li>abuse, harass or intimidate any person;</li>
            <li>
              post or transmit any unauthorised material to the web app,
              including material that is defamatory, racist, obscene or
              threatening;
            </li>

            <li>
              violate a person’s intellectual property rights or proprietary
              information;
            </li>
            <li>
              carry out illegal activities or to promote illegal products or
              activities; or
            </li>
            <li>use the web app except as permitted under these Terms.</li>
          </ol>
          We reserve the right to restrict, suspend or terminate your access to
          the web app, or any Services, Content or features, if you breach these
          Terms or the law, or if we determine, in our discretion, that you are
          misusing the Services in any way.
        </Content>
      </Block>

      <Block>
        <TitleBlock className="title-font">
          Your representations and warranties
        </TitleBlock>
        <Content>
          You represent and warrant to us that:
          <ol>
            <li>
              if you are an individual, you are the owner or authorised
              representative of a retail food business in Australia;
            </li>
            <li>
              you are eligible to register an account on and use the web app and
              the Services;
            </li>
            <li>
              you have the authority and ability to enter into and perform your
              obligations under these Terms;
            </li>
            <li>
              any information you provide in connection with the Services,
              including about your business, is true, accurate and complete;
            </li>
            <li>
              you and all transactions initiated by you will comply with all
              applicable laws;
            </li>
            <li>
              you will not use the web app or the Services, directly or
              indirectly, for any unauthorised, improper or wrongful way, or in
              any way that interferes with the Services.
            </li>
          </ol>
        </Content>
      </Block>

      <Block>
        <TitleBlock className="title-font">Your liability</TitleBlock>
        <Content>
          <ol>
            <li>
              You acknowledge and agree that, except as set out in these Terms
              and to the extent permitted by law, you are solely responsible
              for:
              <ul>
                <li>
                  any loss arising out of your use of our web app and the
                  Services;
                </li>
                <li>
                  any claims brought by your customers, including users of the
                  FoodMe web app who link to your website and/or use your
                  products or services, relating to:
                  <ul>
                    <li>
                      goods or services you supply to those third parties;
                    </li>
                    <li>any of your User Content on our web app;</li>
                    <li>any content on your website.</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              You agree to indemnify FoodMe, our officers, employees, agents or
              contractors from all claims, loss, damage, costs and expenses
              relating to:
              <ul>
                <li>
                  any claims brought by users of the FoodMe web app relating to:
                  <ul>
                    <li>goods or services supplied by you, or </li>
                    <li>any of your User Content posted on our web app; or</li>
                    <li>any of the content on your website.</li>
                  </ul>
                </li>
                <li>
                  an actual or alleged breach of any of your representations,
                  warranties or obligations under these Terms;
                </li>
                <li>
                  our violation of any third party rights, including privacy or
                  intellectual property rights;
                </li>
                <li>your breach of any law;</li>
                <li>
                  any third party’s access to or use of the Services through
                  your account;
                </li>
                except to the extent to which it is caused by the fraud,
                negligence or wilful misconduct of FoodMe, its officers or
                employees.
              </ul>
            </li>
          </ol>
        </Content>
      </Block>

      <Block>
        <TitleBlock className="title-font">Our liability</TitleBlock>
        <Typography fontSize={16} mb={2} className="title-font">
          Liability under Australian Consumer Law
        </Typography>
        <Content>
          If you are a consumer under the Australian Consumer Law, FoodMe
          acknowledges that the Consumer Guarantees (as defined in the
          Australian Consumer Law) will apply to the supply of goods or services
          (or both) under these Terms. Nothing in these Terms is intended to
          exclude, restrict or modify the rights you may have under Schedule 2
          of the Australian Consumer Law.
        </Content>
        <Content>
          To the extent permitted by law, FoodMe’s liability for breach of a
          Consumer Guarantee is limited to (at our election):
          <ol type="a">
            <li>
              for supply of goods:
              <ul>
                <li>replacing the goods or supplying equivalent goods; </li>
                <li>
                  paying the cost of replacing the goods or acquiring equivalent
                  goods; or
                </li>
              </ul>
            </li>
            <li>
              for supply of services:
              <ul>
                <li>resupplying the services; or</li>
                <li>paying the cost of having the services supplied again.</li>
              </ul>
            </li>
          </ol>
        </Content>

        <Typography fontSize={16} mb={2} className="title-font">
          Disclaimers and limitations on our liability
        </Typography>
        <Content>
          <ol>
            <li>
              Any warranties or conditions which are not guaranteed by the
              Australian Consumer Law or the Competition and Consumer Regulation
              2010 are expressly excluded, where permitted by law, including
              liability for any direct or indirect, punitive, incidental,
              special, consequential or exemplary damages, or for any damages
              for loss of profits, data or goodwill, arising from:
              <ol type="a">
                <li>breach of any express or implied warranty or condition;</li>
                <li>the use or unavailability of the Services; or</li>
                <li>
                  any damage, loss, or injury resulting from hacking or
                  unauthorised access or use of the Services or your FoodMe
                  account,
                </li>
              </ol>
              except to the extent that it is caused by fraud, negligence or
              wilful misconduct of FoodMe, its directors, officers or employees.
            </li>
            <li>
              FoodMe makes no representation and gives no warranty as to the
              accuracy, availability, relevance, quality, fitness or suitability
              for a particular purpose of any Content or Services available on
              or from the web app
            </li>
            <li>
              FoodMe is not responsible for and disclaims any liability arising
              from:
            </li>
            <li>
              The maximum amount of FoodMe’s total combined liability to you for
              any claim in relation to your use of the Services (whether in
              contract, tort, negligence, strict liability or any other basis)
              will not exceed the greater of:
            </li>
          </ol>
        </Content>
      </Block>

      <Block>
        <TitleBlock className="title-font">Disputes</TitleBlock>
        <Content>
          If a dispute arises between us, you and FoodMe agree to the following
          procedure to resolve the dispute:
          <ol>
            <li>
              If the dispute cannot be resolved within 30 days after either of
              us notifies the other in writing of the dispute, we will appoint a
              commercial mediator to assist with resolution of the dispute or,
              if we are unable to agree on a mediator, either of us may request
              the Australian Centre for International Commercial Arbitration
              (ACICA), Sydney, to appoint a mediator in accordance with the
              ACICA Mediation Rules.
            </li>
            <li>
              If the dispute has not been settled within 60 days following a
              written invitation to mediate, the dispute is to be resolved by
              arbitration in accordance with the ACICA Arbitration Rules. The
              seat of arbitration will be Sydney, Australia.
            </li>
          </ol>
        </Content>
      </Block>
      <Block>
        <TitleBlock className="title-font">
          Governing law and jurisdiction
        </TitleBlock>
        <Content>
          These Terms and your use of the Services are governed by the law of
          New South Wales, Australia. You agree to submit to the non-exclusive
          jurisdiction of the courts exercising jurisdiction in that state.
        </Content>
      </Block>

      <Block>
        <Content>Effective as at 10 June 2022</Content>
      </Block>
    </ContainerPage>
  );
}
