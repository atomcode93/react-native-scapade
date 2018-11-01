import React from 'react'
import styled from 'styled-components/native'
import { Text } from 'react-native';
import Button from '../../components/Button'

export default class Terms extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false
  }

  render () {
    const { navigation } = this.props

    return (
      <Wrapper>
        <Background source={require('../../assets/home.jpg')} resizeMode="cover" />
        <Black />
        <Back onPress={() => navigation.goBack()}>
          <BackIcon source={require('../../assets/back.png')} />
        </Back>
        <Container>
          <Title>Terms of Use</Title>
          <TermsOfUse>
            Last revised on 10/26/2017
            Welcome to Scapade (“us,” “we,” the “Company” or “Scapade”).
            1. Acceptance of Terms of Use Agreement.
            By creating a Scapade account, whether through a mobile device, mobile application or
            computer (collectively, the “Service”) you agree to be bound by (i) these Terms of Use, (ii) our
            Privacy Policy and Safety Tips, each of which is incorporated by reference into this Agreement,
            and (iii) any terms disclosed and agreed to by you if you purchase additional features, products
            or services we offer on the Service (collectively, this “Agreement”). If you do not accept and
            agree to be bound by all of the terms of this Agreement, please do not use the Service.
            We may make changes to this Agreement and to the Services from time to time. We may do this
            for a variety of reasons including to reflect changes in or requirements of the law, new features,
            or changes in business practices. The most recent version is the version that applies. If the
            changes include material changes that affect your rights or obligations, we will notify you in
            advance of the changes by reasonable means, which could include notification through the
            Services or via email. If you continue to use the Services after the changes become effective,
            then you agree to the revised Agreement.
            2. Eligibility.
            You must be at least 18 years of age to create an account on Scapade and use the Service. By
            creating an account and using the Service, you represent and warrant that:
            • you can form a binding contract with Scapade,
            • you are not a person who is barred from using the Service under the laws of the United
            States or any other applicable jurisdiction–meaning that you do not appear on the U.S.
            Treasury Department’s list of Specially Designated Nationals or face any other similar
            prohibition,
            • you will comply with this Agreement and all applicable local, state, national and
            international laws, rules and regulations, and
            • you have never been convicted of a felony and that you are not required to register as a
            sex offender with any state, federal or local sex offender registry.
            3. Your Account.
            In order to use Scapade, you may sign in using your Facebook login. If you do so, you
            authorize us to access and use certain Facebook account information, including but not limited
            to your public Facebook profile and information about Facebook friends you share in common
            with other Scapade users. For more information regarding the information we collect from you
            and how we use it, please consult our Privacy Policy.
            You are responsible for maintaining the confidentiality of your login credentials you use to sign
            up for Scapade, and you are solely responsible for all activities that occur under those
            credentials. If you think someone has gained access to your account, please immediately
            contact nyc@scapadeapp.com.
            4. Modifying the Services and Termination.
            Scapade is always striving to improve the Services and bring you additional functionality that
            you will find engaging and useful. This means we may add new product features or
            enhancements from time to time as well as remove some features, and if these actions do not
            materially affect your rights or obligations, we may not provide you with notice before taking
            them. We may even suspend the Services entirely, in which event we will notify you in advance
            unless extenuating circumstances, such as safety or security concerns, prevent us from doing
            so.
            You may terminate your account at any time, for any reason, by following the instructions in
            “Settings” in the Service, however you will need to manage your in app purchases through your

            mobile device platform (e.g., iTunes, Google Play). Scapade may terminate your account at any
            time without notice if it believes that you have violated this Agreement. Upon such termination,
            you will not be entitled to any refund for purchases. After your account is terminated, this
            Agreement will terminate, except that the following provisions will still apply to you and
            Scapade: Section 5, Section 6, and Sections 13 through 20.
            5. Safety; Your Interactions with Other Users.
            Though Scapade strives to encourage a respectful user experience through features like the
            double opt-in that only allows users to communicate if they have both indicated interest in one
            another, it is not responsible for the conduct of any user on or off of the Services. You agree to
            use caution in all interactions with other users, particularly if you decide to communicate off the
            Service or meet in person. In addition, you agree to review and follow Scapade’s Safety Tips,
            located on scapadeapp.com, prior to using the Service. You should not provide your financial
            information (for example, your credit card or bank account information), or wire or otherwise
            send money, to other users.
            YOU ARE SOLELY RESPONSIBLE FOR YOUR INTERACTIONS WITH OTHER USERS. YOU
            UNDERSTAND THAT SCAPADE DOES NOT CONDUCT CRIMINAL BACKGROUND CHECKS
            ON ITS USERS OR OTHERWISE INQUIRE INTO THE BACKGROUND OF ITS USERS.
            SCAPADE MAKES NO REPRESENTATIONS OR WARRANTIES AS TO THE CONDUCT OF
            USERS. SCAPADE RESERVES THE RIGHT TO CONDUCT ANY CRIMINAL BACKGROUND
            CHECK OR OTHER SCREENINGS (SUCH AS SEX OFFENDER REGISTER SEARCHES) AT
            ANY TIME USING AVAILABLE PUBLIC RECORDS.
            6. Rights Scapade Grants You.
            Scapade grants you a personal, worldwide, royalty-free, non-assignable, nonexclusive,
            revocable, and non-sublicensable license to access and use the Services. This license is for the
            sole purpose of letting you use and enjoy the Services’ benefits as intended by Scapade and
            permitted by this Agreement. Therefore, you agree not to:
            • use the Service or any content contained in the Service for any commercial purposes
            without our written consent.
            • copy, modify, transmit, create any derivative works from, make use of, or reproduce in
            any way any copyrighted material, images, trademarks, trade names, service marks, or
            other intellectual property, content or proprietary information accessible through the
            Service without Scapade’s prior written consent.
            • express or imply that any statements you make are endorsed by Scapade.
            • use any robot, bot, spider, crawler, scraper, site search/retrieval application, proxy or
            other manual or automatic device, method or process to access, retrieve, index, “data
            mine,” or in any way reproduce or circumvent the navigational structure or presentation
            of the Service or its contents.
            • use the Services in any way that could interfere with, disrupt or negatively affect the
            Service or the servers or networks connected to the Service.
            • upload viruses or other malicious code or otherwise compromise the security of the
            Services.
            • forge headers or otherwise manipulate identifiers in order to disguise the origin of any
            information transmitted to or through the Service.
            • “frame” or “mirror” any part of the Service without Scapade’s prior written authorization.
            • use meta tags or code or other devices containing any reference to Scapade or the
            Service (or any trademark, trade name, service mark, logo or slogan of Scapade) to
            direct any person to any other website for any purpose.
            • modify, adapt, sublicense, translate, sell, reverse engineer, decipher, decompile or
            otherwise disassemble any portion of the Service, or cause others to do so.

            • use or develop any third-party applications that interact with the Services or other users’
            Content or information without our written consent.
            • use, access, or publish the Scapade application programming interface without our
            written consent.
            • probe, scan or test the vulnerability of our Services or any system or network.
            • encourage or promote any activity that violates this Agreement.
            The Company may investigate and take any available legal action in response to illegal and/ or
            unauthorized uses of the Service, including termination of your account.
            Any software that we provide you may automatically download and install upgrades, updates, or
            other new features. You may be able to adjust these automatic downloads through your device’s
            settings.
            7. Rights you Grant Scapade.

            By creating an account, you grant to Scapade a worldwide, transferable, sub-licensable, royalty-
            free, right and license to host, store, use, copy, display, reproduce, adapt, edit, publish, modify

            and distribute information you authorize us to access from Facebook, as well as any information
            you post, upload, display or otherwise make available (collectively, “post”) on the Service or
            transmit to other users (collectively, “Content”). Our license to your Content is subject to your
            rights under applicable law (for example laws regarding personal data protection to the extent
            any Content contains personal information as defined by those laws) and is for the limited
            purpose of operating, developing, providing, and improving the Service and researching and
            developing new ones. You agree that any Content you place or that you authorize us to place on
            the Service may be viewed by other users and may be viewed by any person visiting or
            participating in the Service (such as individuals who may receive shared Content from other
            Scapade users).
            You agree that all information that you submit upon creation of your account, including
            information submitted from your Facebook account, is accurate and truthful and you have the
            right to post the Content on the Service and grant the license to Scapade above.
            You understand and agree that we may monitor or review any Content you post as part of a
            Service. We may delete any Content, in whole or in part, that in our sole judgment violates this
            Agreement or may harm the reputation of the Service.
            When communicating with our customer care representatives, you agree to be respectful and
            kind. If we feel that your behavior towards any of our customer care representatives or other
            employees is at any time threatening or offensive, we reserve the right to immediately terminate
            your account.
            In consideration for Scapade allowing you to use the Services, you agree that we, our affiliates,
            and our third-party partners may place advertising on the Services. By submitting suggestions
            or feedback to Scapade regarding our Services, you agree that Scapade may use and share
            such feedback for any purpose without compensating you.
            You agree that Scapade may access, preserve and disclose your account information and
            Content if required to do so by law or in a good faith belief that such access, preservation or
            disclosure is reasonably necessary, such as to: (i) comply with legal process; (ii) enforce this
            Agreement; (iii) respond to claims that any Content violates the rights of third parties; (iv)
            respond to your requests for customer service; or (v) protect the rights, property or personal
            safety of the Company or any other person.
            8. Community Rules.
            By using the Services, you agree that you will not:
            • use the Service for any purpose that is illegal or prohibited by this Agreement.
            • spam, solicit money from or defraud any users.

            • impersonate any person or entity or post any images of another person without his or
            her permission.
            • bully, “stalk,” intimidate, harass or defame any person.
            • post any Content that violates or infringes anyone’s rights, including rights of publicity,
            privacy, copyright, trademark or other intellectual property or contract right.
            • post any Content that is hate speech, threatening, sexually explicit or pornographic;
            incites violence; or contains nudity or graphic or gratuitous violence.
            • post any Content that promotes racism, bigotry, hatred or physical harm of any kind
            against any group or individual.
            • solicit passwords for any purpose, or personal identifying information for commercial or
            unlawful purposes from other users or disseminate another person’s personal
            information without his or her permission.
            • use another user’s account.
            • create another account if we have already terminated your account, unless you have our
            permission.
            Scapade reserves the right to investigate and/ or terminate your account without a refund of any
            purchases if you have misused the Service or behaved in a way that Scapade regards as
            inappropriate or unlawful, including actions or communications that occur off the Service but
            involve users you meet through the Service.
            9. Other Users’ Content.
            Although Scapade reserves the right to review and remove Content that violates this
            Agreement, such Content is the sole responsibility of the user who posts it, and Scapade cannot
            guarantee that all Content will comply with this Agreement. If you see Content on the Services
            that violates this Agreement, please report it within the Services or via nyc@scapadeapp.com.
            10. Purchases.
            In App Purchases. From time to time, Scapade may offer products and services for purchase
            (“in app purchases”) through iTunes, Google Play or other application platforms authorized by
            Scapade (each, a “Software Store”). If you choose to make an in app purchase, you will be
            prompted to enter details for your account with your Software Store (“your IAP Account”), and
            your IAP Account will be charged for the in app purchase in accordance with the terms
            disclosed to you at the time of purchase as well as the general terms for in app purchases that
            apply to your IAP Account. Some Software Stores may charge you sales tax, depending on
            where you live. If you purchase an auto-recurring periodic subscription through an in app
            purchase, your IAP Account will be billed continuously for the subscription until you cancel. After
            your initial subscription commitment period, and again after any subsequent subscription period,
            your subscription will automatically continue for an additional equivalent period, at the price you
            agreed to when subscribing. If you do not wish your subscription to renew automatically, or if
            you want to change or terminate your subscription, you will need to log in to your IAP account
            and follow instructions to cancel your subscription, even if you have otherwise deleted your
            account with us or if you have deleted the Scapade application from your device. Deleting your
            account on Scapade or deleting the Scapade application from your device does not cancel your
            subscription; Scapade will retain all funds charged to your IAP Account until you cancel your
            subscription through your IAP Account.
            Scapade Online Purchases.
            If you choose to make a purchase through Scapade Online, you agree to pay Scapade all
            charges at the prices displayed to you for the services you’ve selected as well as any sales or
            similar taxes that may be imposed on your payments, and you authorize Scapade to charge
            your chosen payment provider (your “Payment Method”). Scapade may correct any billing errors
            or mistakes that it makes even if it has already requested or received payment. If you initiate a

            chargeback or otherwise reverse a payment made with your Payment Method, Scapade may
            terminate your account immediately in its sole discretion.
            If you purchase a subscription through Scapade Online, your subscription will continue
            indefinitely until cancelled by you. After your initial subscription commitment period, and again
            after any subsequent subscription period, your subscription will automatically continue for an
            additional equivalent period, at the price you agreed to when subscribing, until you cancel. You
            agree that your account will be subject to this automatic renewal feature. If you do not wish your
            account to renew automatically, or if you want to change or terminate your subscription, please
            log in and go to “My Profile” on Scapade Online and follow the instructions. If you cancel your
            subscription, you may use your subscription until the end of your then-current subscription term,
            and your subscription will not be renewed after your then-current term expires.
            You may edit your Payment Method information by visiting Scapade Online and going to “My
            Profile.” If a payment is not successfully settled, due to expiration, insufficient funds, or
            otherwise, and you do not edit your Payment Method information or cancel your subscription,
            you remain responsible for any uncollected amounts and authorize us to continue billing the
            Payment Method, as it may be updated. This may result in a change to your payment billing
            dates. In addition, you authorize us to obtain updated or replacement expiration dates and card
            numbers for your credit or debit card as provided by your credit or debit card issuer. The terms
            of your payment will be based on your Payment Method and may be determined by agreements
            between you and the financial institution, credit card issuer or other provider of your chosen
            Payment Method. If you reside outside of the Americas, you agree that your payment to
            Scapade will be through MTCH Technology Services Limited.
            11. Notice and Procedure for Making Claims of Copyright Infringement.
            If you believe that your work has been copied and posted on the Service in a way that
            constitutes copyright infringement, please provide our Copyright Agent with the following
            information:
            • an electronic or physical signature of the person authorized to act on behalf of the owner
            of the copyright interest;
            • a description of the copyrighted work that you claim has been infringed;
            • a description of where the material that you claim is infringing is located on the Service
            (and such description must be reasonably sufficient to enable us to find the alleged
            infringing material);
            • your contact information, including address, telephone number and email address;
            • a written statement by you that you have a good faith belief that the disputed use is not
            authorized by the copyright owner, its agent, or the law; and
            • a statement by you, made under penalty of perjury, that the above information in your
            notice is accurate and that you are the copyright owner or authorized to act on the
            copyright owner’s behalf.
            Notice of claims of copyright infringement should be provided to the Company’s Copyright Agent
            at nyc@scapadeapp.com.
            Scapade will terminate the accounts of repeat infringers.
            12. Disclaimers.
            SCAPADE PROVIDES THE SERVICE ON AN “AS IS” AND “AS AVAILABLE” BASIS AND TO
            THE EXTENT PERMITTED BY APPLICABLE LAW, GRANTS NO WARRANTIES OF ANY
            KIND, WHETHER EXPRESS, IMPLIED, STATUTORY OR OTHERWISE WITH RESPECT TO
            THE SERVICE (INCLUDING ALL CONTENT CONTAINED THEREIN), INCLUDING, WITHOUT
            LIMITATION, ANY IMPLIED WARRANTIES OF SATISFACTORY QUALITY,
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE OR NON-INFRINGEMENT.

            SCAPADE DOES NOT REPRESENT OR WARRANT THAT (A) THE SERVICE WILL BE
            UNINTERRUPTED, SECURE OR ERROR FREE, (B) ANY DEFECTS OR ERRORS IN THE
            SERVICE WILL BE CORRECTED, OR (C) THAT ANY CONTENT OR INFORMATION YOU
            OBTAIN ON OR THROUGH THE SERVICES WILL BE ACCURATE.
            SCAPADE TAKES NO RESPONSIBILITY FOR ANY CONTENT THAT YOU OR ANOTHER
            USER OR THIRD PARTY POSTS, SENDS OR RECEIVES THROUGH THE SERVICES. ANY
            MATERIAL DOWNLOADED OR OTHERWISE OBTAINED THROUGH THE USE OF THE
            SERVICE IS ACCESSED AT YOUR OWN DISCRETION AND RISK.
            13. Third Party Services.
            The Service may contain advertisements and promotions offered by third parties and links to
            other web sites or resources. Scapade is not responsible for the availability (or lack of
            availability) of such external websites or resources. If you choose to interact with the third
            parties made available through our Service, such party’s terms will govern their relationship with
            you. Scapade is not responsible or liable for such third parties’ terms or actions.
            14. Limitation of Liability.
            TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL
            SCAPADE, ITS AFFILIATES, EMPLOYEES, LICENSORS OR SERVICE PROVIDERS BE
            LIABLE FOR ANY INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL OR
            PUNITIVE DAMAGES, INCLUDING, WITHOUT LIMITATION, LOSS OF PROFITS, WHETHER
            INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR
            OTHER INTANGIBLE LOSSES, RESULTING FROM: (I) YOUR ACCESS TO OR USE OF OR
            INABILITY TO ACCESS OR USE THE SERVICES, (II) THE CONDUCT OR CONTENT OF
            OTHER USERS OR THIRD PARTIES ON, THROUGH, OR FOLLOWING USE OF THE
            SERVICES; OR (III) UNAUTHORIZED ACCESS, USE OR ALTERATION OF YOUR CONTENT,
            EVEN IF SCAPADE HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. IN NO
            EVENT WILL SCAPADE’S AGGREGATE LIABILITY TO YOU FOR ALL CLAIMS RELATING TO
            THE SERVICE EXCEED THE AMOUNT PAID, IF ANY, BY YOU TO SCAPADE FOR THE
            SERVICE WHILE YOU HAVE AN ACCOUNT.
            SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN
            DAMAGES, SO SOME OR ALL OF THE EXCLUSIONS AND LIMITATIONS IN THIS SECTION
            MAY NOT APPLY TO YOU.
            15. Arbitration, Class-Action Waiver, and Jury Waiver.
            Except for users residing within the EU or European Economic Area and elsewhere where
            prohibited by applicable law:
            A The exclusive means of resolving any dispute or claim arising out of or relating to this
            Agreement (including any alleged breach thereof) or the Service shall be BINDING
            ARBITRATION administered by the American Arbitration Association under the
            Consumer Arbitration Rules. The one exception to the exclusivity of arbitration is that
            you have the right to bring an individual claim against the Company in a small-claims
            court of competent jurisdiction. But whether you choose arbitration or small-claims court,
            you may not under any circumstances commence or maintain against the Company any
            class action, class arbitration, or other representative action or proceeding.
            B By using the Service in any manner, you agree to the above arbitration agreement. In
            doing so, YOU GIVE UP YOUR RIGHT TO GO TO COURT to assert or defend any

            claims between you and the Company (except for matters that may be taken to small-
            claims court). YOU ALSO GIVE UP YOUR RIGHT TO PARTICIPATE IN A CLASS

            ACTION OR OTHER CLASS PROCEEDING. Your rights will be determined by a
            NEUTRAL ARBITRATOR, NOT A JUDGE OR JURY, and the arbitrator shall determine
            all issues regarding the arbitrability of the dispute. You are entitled to a fair hearing

            before the arbitrator. The arbitrator can grant any relief that a court can, but you should
            note that arbitration proceedings are usually simpler and more streamlined than trials
            and other judicial proceedings. Decisions by the arbitrator are enforceable in court and
            may be overturned by a court only for very limited reasons.
            C Any proceeding to enforce this arbitration agreement, including any proceeding to
            confirm, modify, or vacate an arbitration award, may be commenced in any court of
            competent jurisdiction. In the event that this arbitration agreement is for any reason held
            to be unenforceable, any litigation against the Company (except for small-claims court
            actions) may be commenced only in the federal or state courts located in Dallas County,
            Texas. You hereby irrevocably consent to the jurisdiction of those courts for such
            purposes.
            D This Agreement, and any dispute between you and the Company, shall be governed by
            the laws of the state of Texas without regard to principles of conflicts of law, provided
            that this arbitration agreement shall be governed by the Federal Arbitration Act.
            E The online dispute settlement platform of the European Commission is available under
            http://ec.europa.eu/odr. Scapade does not take part in dispute settlement procedures in
            front of a consumer arbitration entity for users residing in the EU or European Economic
            Area.
            16. Governing Law.
            For users residing in the EU or European Economic Area or elsewhere where our arbitration
            agreement is prohibited by law, the laws of Texas, U.S.A., excluding Texas’s conflict of laws
            rules, will apply to any disputes arising out of or relating to this Agreement or the Services. For
            the avoidance of doubt, the choice of Texas governing law shall not supersede any mandatory
            consumer protection legislation in such jurisdictions.
            17. Venue.
            Except for users residing in the EU or European Economic Area, who may bring claims in their
            country of residence in accordance with applicable law, all claims arising out of or relating to this
            Agreement or the Services will be litigated exclusively in the federal or state courts of Dallas
            County, Texas, U.S.A., and you and Scapade consent to personal jurisdiction in those courts.
            18. Indemnity by You.
            You agree, to the extent permitted under applicable law, to indemnify, defend and hold harmless
            Scapade, our affiliates, and their and our respective officers, directors, agents, and employees
            from and against any and all complaints, demands, claims, damages, losses, costs, liabilities
            and expenses, including attorney’s fees, due to, arising out of, or relating in any way to your
            access to or use of the Services, your Content, or your breach of this Agreement.
            19. Entire Agreement; Other.
            This Agreement, with the Privacy Policy, the Safety Tips and any terms disclosed and agreed to
            by you if you purchase additional features, products or services we offer on the Service,
            contains the entire agreement between you and Scapade regarding the use of the Service. If
            any provision of this Agreement is held invalid, the remainder of this Agreement shall continue in
            full force and effect. The failure of the Company to exercise or enforce any right or provision of
            this Agreement shall not constitute a waiver of such right or provision. You agree that your
            Scapade account is non-transferable and all of your rights to your account and its Content
            terminate upon your death. No agency, partnership, joint venture or employment is created as a
            result of this Agreement and you may not make any representations or bind Scapade in any
            manner.
        </TermsOfUse>
        </Container>
      </Wrapper>
    )
  }
}


const Wrapper = styled.View`
  position: relative;
`

const Background = styled.Image`
  height: 100%;
  width: 100%;
`

const Black = styled.View`
  position: absolute;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
`

const Back = styled.TouchableOpacity`
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 2;
`

const BackIcon = styled.Image`
  height: 30px;
  width: 30px;
`

const Container = styled.ScrollView`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 40px 16px;
  flex: 1;
`

const Title = styled.Text`
  margin-top: 40px;
  font-size: 24px;
  font-weight: 700;
  color: #FFFFFF;
  background: rgba(0, 0, 0, 0);
`

const TermsOfUse = styled.Text`
  margin-top: 16px;
  line-height: 20px;
  color: #FFFFFF;
  background: rgba(0, 0, 0, 0);
`