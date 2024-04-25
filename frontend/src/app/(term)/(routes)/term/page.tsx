import React from "react";
import classNames from "classnames/bind";
import styles from "./Term.module.scss";

const cx = classNames.bind(styles);
type Props = {};

const Term = function ({}: Props) {
    return (
        <div className={cx("wrapper")}>
            <div>
                <div className={cx("terms")}>
                    <div>
                        <h1 style={{ paddingTop: "3pt", textIndent: "0pt", textAlign: "center", textDecoration: "underline", fontSize: 16 }}>
                            TERMS OF USE
                        </h1>
                        <p style={{ paddingTop: "6pt", paddingLeft: "5pt", textIndent: "0pt" }}>
                            These Terms of Use (the “<b>Terms</b>”) constitute a binding legal agreement between each individual, entity, group or
                            association who views, interacts, links to or otherwise uses or derives any benefit (the “<b>User</b>” or “<b>Users</b>”,
                            “<b>You</b>”, “<b>you</b>”, “<b>Your</b>”, “<b>Yours</b>
                            <a
                                href="https://djed.xyz/"
                                target="_blank"
                                rel="noreferrer"
                                style={{ color: "white", fontStyle: "normal", textDecoration: "none", fontSize: "16px" }}
                            >
                                ”) from the website and services located at{" "}
                            </a>
                            <span style={{ color: "white", fontStyle: "normal", textDecoration: "underline", fontSize: "16px" }}>
                                https://djed.xyz
                            </span>
                            (the “<b>Website</b>”), provided by Decentralized Solutions Limited, a company organized under the laws of British Virgin
                            Islands (the “<b>Company</b>” and/or “<b>Our</b>” and/or “<b>We</b>” and/or “<b>Us</b>”) and each of its successors and
                            assigns.
                        </p>
                        <p className="s4" style={{ paddingTop: "6pt", paddingLeft: "6pt", textIndent: "0pt" }}>
                            <a
                                href="mailto:contact@djed.xyz"
                                target="_blank"
                                rel="noreferrer"
                                style={{ color: "white", fontStyle: "normal", textDecoration: "none", fontSize: "16px" }}
                            >
                                Please contact us at{" "}
                            </a>
                            contact@djed.xyz<span className="s3"> </span>
                            <span className="p">for any questions or issues you may have with respect to these Terms.</span>
                        </p>
                        <p style={{ textIndent: "0pt", textAlign: "left" }}>
                            <br />
                        </p>
                        <p style={{ paddingTop: "10pt", paddingLeft: "5pt", textIndent: "0pt" }}>
                            THESE TERMS SET FORTH THE LEGALLY BINDING TERMS AND CONDITIONS THAT GOVERN YOUR USE OF THE WEBSITE AND SERVICES. BY
                            ACCESSING OR USING THE WEBSITE OR SERVICES, YOU ARE ACCEPTING THESE TERMS (ON BEHALF OF YOURSELF OR AN ENTITY, GROUP, OR
                            ASSOCIATION THAT YOU REPRESENT), AND YOU REPRESENT AND WARRANT THAT YOU HAVE THE RIGHT, AUTHORITY, AND CAPACITY TO ENTER
                            INTO THESE TERMS (ON BEHALF OF YOURSELF OR AN ENTITY, GROUP, OR ASSOCIATION THAT YOU REPRESENT). IF YOU DO NOT AGREE WITH
                            ALL OF THE PROVISIONS OF THESE TERMS, DO NOT ACCESS AND/OR USE THE WEBSITE AND SERVICES.
                        </p>
                        <p style={{ paddingTop: "6pt", paddingLeft: "5pt", textIndent: "0pt" }}>
                            WE RESERVE THE RIGHT TO CHANGE OR MODIFY ANY OF THE TERMS AND CONDITIONS CONTAINED IN THESE TERMS OR ANY POLICY GOVERNING
                            THE USE OF THE WEBSITE AND SERVICES AT ANY TIME AND IN OUR SOLE DISCRETION. ANY CHANGES OR MODIFICATIONS WILL BE EFFECTIVE
                            IMMEDIATELY UPON THE POSTING OF SUCH REVISIONS, AND YOU WAIVE ANY RIGHT YOU MAY HAVE TO RECEIVE SPECIFIC NOTICE OF SUCH
                            CHANGES OR MODIFICATIONS. YOUR CONTINUED USE OF THE WEBSITE OR SERVICES FOLLOWING THE POSTING OF CHANGES OR MODIFICATIONS
                            WILL CONFIRM YOUR ACCEPTANCE OF SUCH CHANGES OR MODIFICATIONS.
                        </p>
                        <p style={{ textIndent: "0pt", textAlign: "left" }}>
                            <br />
                        </p>
                        <ol className={cx("list-wrapper")} id="l1">
                            <li>
                                <h2 className={cx("title-h2")} style={{ paddingTop: "10pt", paddingLeft: "34pt", textAlign: "left" }}>
                                    1. INTRODUCTION
                                </h2>
                                <ol className={cx("list-wrapper")} id="l2">
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <a
                                                href="https://eprint.iacr.org/2021/1069.pdf"
                                                target="_blank"
                                                rel="noreferrer"
                                                style={{ color: "white", fontStyle: "normal", textDecoration: "none", fontSize: "16px" }}
                                            >
                                                <span className={cx("paragragh")}>1.1.</span> The Website is a website-hosted non-custodial user
                                                interface. The Website provides non- exclusive access to the Djed protocol (
                                            </a>
                                            <span className="s4">https://eprint.iacr.org/2021/1069.pdf</span>) (the “<b>Protocol</b>”) and allows
                                            Users to view, use, interact with, generate, or otherwise manipulate information related to the Protocol,
                                            Djed and Shen Tokens, and other digital assets.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "5pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>1.2.</span> The Website and Services (as defined below) are distinct
                                            from the Protocol. The Protocol is intended to allow users to engage in a collateralized borrowing
                                            function, trading volatile digital assets for a digital asset with a USD target peg (“<b>Djed</b>” or “
                                            <b>Djed Tokens</b>”). Users may also contribute digital assets to the Protocol pool to receive a token
                                            representing a claim on the reserve assets (“
                                            <b>Shen</b>” or “<b>Shen Tokens</b>”). The pool of assets so contributed is then held and managed at an
                                            on-chain address pursuant to the rules embodied in the code of the Protocol’s smart contracts on a
                                            self-executing basis.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "3pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>1.3.</span> To mint the Djed, Users will need to interact with the
                                            Protocol’s smart contract by sending volatile digital assets (such as ADA) to the Protocol’s address and
                                            thereafter receiving Djet from the Protocol. Each Djed may be redeemed for $1 of assets in the Protocol
                                            pool at the then-market prices, and effectively acts as a mechanism to obtain liquidity for ADA and/or
                                            another volatile asset.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "5pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>1.4.</span> Shen retains a residual, pro-rata claim on assets in the
                                            Protocol pool above a specified ratio. In particular, Protocol’s users will not be able to burn Shen for
                                            ADA (and/or other volatile assets) if the reserve ratio is below 400%. The Protocol may also not allow
                                            users to purchase Shen once a reserve ratio gets to 800%. In addition, Shen holders effectively accrue a
                                            certain portion of the fees generated through the operation of the Protocol (the “Shen Pool”), and subject
                                            to the Cardano staking epoch, and other metrics (such as ratio in the Shen Pool, delays in releasing the
                                            fees, etc.). The Shen Pool may be delegated to a third party on the Cardano blockchain, in order to
                                            nurture their value in reference to the market.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>1.5.</span> The reserve ratios and other terms might change at any time
                                            pursuant to the rules embodied in the code of the Protocol’s smart contracts on a self-executing basis
                                            without Our knowledge, consent, or control.
                                        </p>
                                    </li>
                                    <li>
                                        <p
                                            className="s4"
                                            style={{ paddingTop: "5pt", paddingLeft: "34pt", textDecoration: "underline", fontWeight: 500 }}
                                        >
                                            <a
                                                href="https://eprint.iacr.org/2021/1069.pdf"
                                                target="_blank"
                                                rel="noreferrer"
                                                style={{ color: "white", fontStyle: "normal", fontSize: "16px" }}
                                            >
                                                <span className={cx("paragragh")}>1.6.</span> For detailed and updated information on the Protocol,
                                                the terms and rights of Djed and Shen holders, and other information, please carefully read and review
                                                the paper describing the Protocol (
                                            </a>
                                            https://eprint.iacr.org/2021/1069.pdf)<span className="p">.</span>
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>1.7.</span> The Company does not control or operate the Protocol and any
                                            of its versions (if any). By using the Website and Services, You understand that We do not control trade
                                            execution on the Protocol.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>1.8.</span> The Company&apos;s role is to facilitate interaction of the
                                            Users with the Protocol. You should examine by Yourself, either independently or together with the
                                            professional advisors, the quality, accuracy, and suitability of the Services and the Website for Your
                                            needs and decide whether You should use and/or rely on the Services, the Website and any of the Website’s
                                            information.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "5pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>1.9.</span> The Company bears no responsibility and cannot be held
                                            liable for the functionality or integrity of the Protocol, Djed and Shen Tokens, other digital assets, any
                                            underlying blockchain, decentralized storage solution, or distributed ledger network. The Company does not
                                            have custody of, and does not control or manage in any way, the funds on the Protocol or those of Users in
                                            even a transitory manner. The Company has no ability to change, and is not responsible for, the Protocol’s
                                            smart contracts. The Protocol’s services are deployed in a public environment wherein users can
                                            autonomously and directly access the Protocol’s services without any involvement or actions taken by the
                                            Company. Any person can transmit orders to the Protocol without using the Services or the Website. Rather,
                                            the Website only provides accessibility for Protocol’s users (on a non-exclusive basis) and streamlines
                                            the process for Protocol’s users to generate and submit a data object embodying their instructions to the
                                            relevant smart contracts deployed on Cardano.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>1.10.</span> We are not acting as Your financial, legal, or tax advisor
                                            and You must not regard us as acting in that capacity. You should consult Your own independent
                                            professional advisors before entering into any transaction and enter into a transaction only if You fully
                                            understand its nature, the contractual relationship into which You are entering, all relevant terms and
                                            conditions, and the nature and extent of your exposure to loss.
                                        </p>
                                    </li>
                                </ol>
                            </li>
                            <li>
                                <h2 className={cx("title-h2")} style={{ paddingTop: "3pt", paddingLeft: "34pt", textAlign: "left" }}>
                                    2. ELIGIBILITY
                                </h2>
                                <p style={{ paddingTop: "6pt", paddingLeft: "34pt", textIndent: "0pt", textAlign: "left" }}>
                                    By accepting the Terms, You represent that You comply with all of the following:
                                </p>
                                <ol className={cx("list-wrapper")} id="l3">
                                    <li>
                                        <p style={{ paddingTop: "8pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>2.1.</span> You are at least the age of majority in your jurisdiction
                                            and in any case at least 18 years old;
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>2.2.</span> You have the right, authority, and capacity to enter into
                                            these Terms and to abide by all the terms and conditions of these Terms;
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>2.3.</span> If You are using the Website on behalf of a corporation or
                                            other legal entity, You have the full right, power and authority to enter into the Terms on behalf of such
                                            corporation or other legal entity and bind them to these Terms;
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>2.4.</span> You are not prohibited from using the Website or the
                                            Services pursuant to the laws of the country in which You reside or are located while using the Website or
                                            the Services;
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>2.5.</span> You are not a Forbidden Person or owned or controlled by a
                                            Forbidden Person and nor are you a citizen, resident (tax or otherwise), or green card holder of, or
                                            located in any Forbidden Territory. “<b>Forbidden Territory</b>” means and includes: (i) the United States
                                            of America (and its territories, including Puerto Rico), Canada, and Israel, British Virgin Islands,
                                            Gibraltar, Iran, North Korea, Sudan, Syria, Lebanon, Russia and the Crimea, Donetsk or Luhansk regions of
                                            Ukraine; (ii) the jurisdictions specified by the Financial Action Task Force, as Jurisdictions under
                                            Increased Monitoring and/or High-Risk Jurisdictions, as they may change from time to time; (iii)
                                            jurisdictions listed under any sanction list administered by the United States of America, the United
                                            Nations Security Council, the European Union, the United Kingdom, Israel or the respective governmental
                                            institutions of any of the foregoing; and (iv) any other jurisdiction which prohibits or requires any
                                            supervision, oversight, licensing regulatory compliance, legal compliance and/or prior approval from any
                                            regulatory (or similar) authority or body or from any monetary or securities body or authority for the
                                            participation in a purchase of digital assets or any similar activity or product. “
                                            <b>Forbidden Persons</b>” refers to any individual, natural person, firm, company, partnership, trust,
                                            corporation, entity, government, state or agency of a state or any other incorporated or unincorporated
                                            body, association, or partnership (whether or not having separate legal personality) that is (i)
                                            established and/or lawfully existing under the laws of a Forbidden Territory; (ii) citizen, resident (tax
                                            or otherwise), green card holder, or located in other jurisdictions that are included from time to time in
                                            international lists of countries at risk of money laundering; (iii) listed under any sanction list
                                            administered by the United States of America, the United Nations Security Council, the European Union, the
                                            United Kingdom, Israel or the respective governmental institutions of any of the foregoing; (iv)
                                            politically exposed person. The definition of the Forbidden Territory is subject to review by the Company
                                            and may be amended from time to time at its sole discretion with or without prior notice; and
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>2.6.</span> You do not use Virtual Private Network (VPN) software or any
                                            other privacy or anonymization tools or techniques in order to circumvent any restrictions which apply to
                                            the Website, especially those which restrict the geographical availability of the Website.
                                        </p>
                                    </li>
                                </ol>
                            </li>
                            <li>
                                <h2 className={cx("title-h2")} style={{ paddingTop: "5pt", paddingLeft: "34pt", textAlign: "left" }}>
                                    3. WEBSITE AND SERVICES
                                </h2>
                                <ol className={cx("list-wrapper")} id="l4">
                                    <li>
                                        <p style={{ paddingTop: "3pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>3.1.</span> The Website and the Services will ease Your accessibility to
                                            the Protocol and will streamline the process for You to generate and to submit a data object embodying
                                            Your instructions (including the mint and burn orders with regard to Djed and/or Shen) to the Protocol.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>3.2.</span> You are urged to carefully read and understand the
                                            Protocol’s whitepaper and terms, reserve ratios, ability, and stability, before using the Website and
                                            Services or transmitting orders to the Protocol.
                                        </p>
                                        <p style={{ paddingTop: "5pt", paddingLeft: "76pt", textIndent: "0pt" }}>
                                            The services that the Website provide will include the following (collectively, the “<b>Services</b>”):
                                        </p>
                                        <ol className={cx("list-wrapper")} id="l5">
                                            <li>
                                                <p style={{ paddingTop: "6pt", paddingLeft: "76pt", textIndent: "-35pt" }}>
                                                    <span className={cx("paragragh")}>3.2.1.</span> Allowing You to access to the Protocol, where You
                                                    may submit Your instructions (including the mint and burn orders with regard to Djed and/or Shen)
                                                    to the Protocol;
                                                </p>
                                            </li>
                                            <li>
                                                <p style={{ paddingTop: "6pt", paddingLeft: "76pt", textIndent: "-35pt" }}>
                                                    <span className={cx("paragragh")}>3.2.2.</span> Access to any other products and services We may
                                                    make available to You on the Website, if any.
                                                </p>
                                            </li>
                                        </ol>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>3.3.</span> We reserve the following rights, which do not constitute
                                            obligations of Ours: (a) with or without notice to You, to update, change, modify, remove, cancel,
                                            suspend, disable, restrict access to, or discontinue the Website and Services or change any features,
                                            component or content thereof; (b) to review, modify, filter, disable, delete and remove any and all
                                            content and information from the Website; and (c) to cooperate with any law enforcement, court or
                                            government investigation or order or third party requesting or directing that We disclose information or
                                            content or information that You provide.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>3.4.</span> You understand and agree that We may engage any third-party
                                            service provider or subcontractor to perform any or all of the Services. We shall not be liable for any
                                            delay, loss or damage of any kind incurred from any Services provided by any third-party service provider
                                            or subcontractor engaged by Us. All claims in connection with the act of any third-party service provider
                                            or subcontractor shall be brought solely and directly against such party and/or its agents.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>3.5.</span> NEITHER THE SERVICES, NOR ANYTHING DISPLAYED ON THE WEBSITE
                                            CONSTITUTES OR SHALL BE DEEMED TO CONSTITUTE FINANCIAL, LEGAL, TAX OR OTHER ADVICE OF ANY KIND, OR A
                                            SOLICITATION TO PURCHASE, SELL OR INVEST IN ANY DIGITAL ASSETS, SECURITIES, OR FINANCIAL PRODUCTS OR TO
                                            ENGAGE IN ANY FINANCIAL STRATEGY. THE COMPANY OR ANY OF COMPANY’S PARTIES (A) DOES NOT GUARANTEE THE
                                            ADEQUACY, ACCURACY, MERCHANTABILITY, TIMELINESS, AND/OR COMPLETENESS, OF THE INFORMATION AND DATA ON THE
                                            WEBSITE; (B) SHALL NOT BEAR ANY RESPONSIBILITY FOR DAMAGES, COSTS OR EXPENSES CAUSED DUE TO RELIANCE
                                            THEREON; AND (C) MAKES NO WARRANTY, EXPRESS OR IMPLIED, AS TO RESULTS THAT MIGHT BE OBTAINED BY HOLDERS OF
                                            ANY DIGITAL ASSETS OR BY USERS OF THE SERVICES, THE WEBSITE, OR ANY INFORMATION CONTAINED THEREON.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "3pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>3.6.</span> By using the Website, You are accepting the Terms, and You
                                            understand that We are not responsible for the market of Djed, Shen, or other digital assets, and We make
                                            no representations or warranties concerning their real or perceived value as denominated in any quoted
                                            currency. Although we may provide historical and/or real-time data regarding the price estimation of the
                                            Djed, Shen, or other Digital Assets, including graphs displayed within the Website showing the price
                                            fluctuations of the Djed, Shen, or other digital assets, such data or graphs are for reference only. We
                                            make no representations regarding the quality, suitability, veracity, usefulness, accuracy or completeness
                                            of such data or graphs, and you should not rely on such data or graphs for any reason whatsoever. You
                                            understand and acknowledge that the value of digital assets can be volatile, and You agree that We are not
                                            in any way responsible or liable for any losses You may incur by holding or trading Djed, Shen, or other
                                            digital assets, even if the Services or the Website are delayed, suspended or interrupted for any reason.
                                            Any content accessed via the Services or the Website should not be considered as a substitute for tailored
                                            investment advice. The contents of the Website should not be used as a basis for making investment
                                            decisions and should not be construed as an attempt to market or promote any type of digital asset.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "5pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>3.7.</span> The Website includes limitations and constraints that are
                                            designed to maintain the Website’s stability. As a result of such limitations and constraints, there may
                                            be situations when the Website does not allow the Services to be used as and when requested. The Company
                                            shall not be liable for any such situations, whether due to reasons within the control of the Company or
                                            due to events beyond its control, and the User undertakes not to make any claim against the Company
                                            because of that.
                                        </p>
                                    </li>
                                </ol>
                            </li>
                            <li>
                                <h2 className={cx("title-h2")} style={{ paddingTop: "6pt", paddingLeft: "34pt", textAlign: "left" }}>
                                    4. NON-CUSTODIAL AND NO FIDUCIARY DUTIES
                                </h2>
                                <ol className={cx("list-wrapper")} id="l6">
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>4.1.</span> The Website is a purely non-custodial application, meaning
                                            You are solely responsible for the custody of the cryptographic private keys to the digital asset wallets
                                            You hold. These Terms are not intended to, and do not, create or impose any fiduciary duties on Us. To the
                                            fullest extent permitted by law, You acknowledge and agree that We owe no fiduciary duties or liabilities
                                            to You or any other party, and that to the extent any such duties or liabilities may exist at law or in
                                            equity, those duties and liabilities are hereby irrevocably disclaimed, waived, and eliminated to the
                                            fullest extent permitted by law. You further agree that the only duties and obligations that We owe you
                                            are those set out expressly in these Terms.
                                        </p>
                                    </li>
                                </ol>
                            </li>
                            <li>
                                <h2 className={cx("title-h2")} style={{ paddingTop: "6pt", paddingLeft: "34pt", textAlign: "left" }}>
                                    5. NO WALLET SERVICES
                                </h2>
                                <ol className={cx("list-wrapper")} id="l7">
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>5.1.</span> You understand and agree that We are not a digital wallet
                                            provider, exchange, broker, financial institution, bank, insurance company, or licensed entity.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>5.2.</span> We do not store Your private keys, backup phrases or
                                            passwords (the “<b>Wallet Information</b>”). You are solely responsible for the custody of the
                                            cryptographic private keys to the digital wallets You hold and connect to the Website. We shall have no
                                            duties, obligations, or liability with regard to any digital wallet or Wallet Information. We do not store
                                            or hold, and We have no access to the Protocol’s private keys, Users’ digital wallets, or Wallet
                                            Information.
                                        </p>
                                    </li>
                                </ol>
                            </li>
                            <li>
                                <h2 className={cx("title-h2")} style={{ paddingTop: "3pt", paddingLeft: "34pt", textAlign: "left" }}>
                                    6. PRIVACY
                                </h2>
                                <ol className={cx("list-wrapper")} id="l8">
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>6.1.</span> When You use the Website and Services, the only information
                                            we collect from You is Your IP address, blockchain wallet address, completed transaction hashes, and the
                                            token names, symbols, or other blockchain identifiers of the tokens. We do not collect any personal
                                            information from You (e.g., Your name or other personal identifiers that can be linked to You). We do,
                                            however, use third-party service providers which may receive or independently obtain Your personal
                                            information from publicly-available sources. We do not control how these third parties handle Your data,
                                            and You should review their privacy policies to understand how they collect, use, and share Your personal
                                            information. By accessing and using the Website and Services, You understand and consent to our data
                                            practices and our service providers&apos; treatment of Your information.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>6.2.</span> We use the information We collect to detect, prevent, and
                                            mitigate financial crime and other illicit or harmful activities on the Website. For these purposes, We
                                            may share the information We collect with blockchain analytics providers. We share information with these
                                            service providers only so that they can help Us promote the safety, security, and integrity of the
                                            Website.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "5pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>6.3.</span> Please note that when You use the Website and Services, You
                                            are interacting with Cardano public blockchain, which by nature may provide transparency into Your
                                            transactions. The Company does not control and is not responsible for any information You make public on
                                            blockchains by taking actions through the Website or using the Services.
                                        </p>
                                    </li>
                                </ol>
                            </li>
                            <li>
                                <h2 className={cx("title-h2")} style={{ paddingTop: "6pt", paddingLeft: "34pt", textAlign: "left" }}>
                                    7. FEES
                                </h2>
                                <ol className={cx("list-wrapper")} id="l9">
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>7.1.</span> In consideration for the Services and in addition to any
                                            wallet, blockchain or other network fees, You may be required to pay additional fees at the Protocol
                                            level. The Company does not generally collect any fees directly from the Users, unless otherwise is
                                            explicitly specified on the Website or the Protocol.
                                        </p>
                                    </li>
                                </ol>
                            </li>
                            <li>
                                <h2 className={cx("title-h2")} style={{ paddingTop: "6pt", paddingLeft: "34pt", textAlign: "left" }}>
                                    8. YOUR REPRESENTATIONS
                                </h2>
                                <p style={{ paddingTop: "6pt", paddingLeft: "34pt", textIndent: "0pt" }}>
                                    By accepting these Terms or by using the Services and/or the Website, You represent, warrant, acknowledge and
                                    undertake that:
                                </p>
                                <ol className={cx("list-wrapper")} id="l10">
                                    <li>
                                        <p style={{ paddingTop: "5pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>8.1.</span> You are aware and understand that (i) the Company is not a
                                            custodian, exchange, financial institution, fiduciary or insurance company, and is not regulated by any
                                            central bank or other governmental authority, (ii) the Company is a user interface provider only,
                                        </p>
                                        <p style={{ paddingLeft: "34pt", textIndent: "0pt" }}>
                                            (iii) the Company does not have custody of, and does not control or manage in any way, the funds on the
                                            Protocol or those of Users in even a transitory manner, and (iv) the Company has no ability to change, and
                                            is not responsible for, the Protocol’s smart contracts. You are therefore not subject to any of the
                                            protections that apply in the case of the regulated entities or regulated business activities.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>8.2.</span> You are not impersonating any other person, operating under
                                            an alias, or otherwise concealing Your identity.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "3pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>8.3.</span> Your obligations under the Terms are valid, binding, and
                                            enforceable and You will not be in breach of any applicable law, authorization, document or agreement by
                                            entering into or complying with obligations or exercising rights under the Terms.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "5pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>8.4.</span> You are in full compliance with all the eligibility
                                            requirements listed above.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "8pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>8.5.</span> You have carefully considered and analyzed all the risks
                                            involved in using the Website and the Services, transmitting orders to the Protocol, holding and entering
                                            into transactions using Djed, Shen or other digital assets, and performing all related actions. You
                                            confirm that there may be additional risks in connection with the use of Services and the Website that are
                                            not currently known or that are currently deemed immaterial. You confirm that the Company will not be
                                            responsible for any of these risks or for the loss or theft of any Djed, Shen or other digital assets.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>8.6.</span> You are able to bear the economic risks associated with
                                            transmitting the orders to the Protocol and entering into transactions using Djed, Shen or other digital
                                            assets. You understand that the value of ADA, Djed, Shen, and other digital assets can be zero at any
                                            time.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>8.7.</span> You are aware that digital assets (including Djed and Shen)
                                            are not insured by any public or private insurer, including against cyber theft or theft by other means.
                                            You confirm that ADA, Djed, Shen or other digital assets may be subject to expropriation and/or theft.
                                            Hackers or other malicious groups or organizations may attempt to interfere with ADA, Djed, Shen or other
                                            digital assets and the Protocol in a variety of ways, including, but not limited to, malware attacks,
                                            denial of service attacks, consensus-based attacks, Sybil attacks, smurfing and spoofing. Furthermore,
                                            because the Protocol rests on open-source software, there is the risk that smart contracts may contain
                                            intentional or unintentional bugs or weaknesses that may negatively affect the digital assets or result in
                                            the loss of ADA, Djed, Shen and other digital assets. You understand that in the event of such a software
                                            bug or weakness, there may be no remedy and You are not guaranteed any remedy, refund or compensation.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>8.8.</span> You are aware and understand the uncertain nature of virtual
                                            currencies and that the Services, the Website, and the Protocol are not regulated by any central bank or
                                            other government authority, do not have any permit or licenses, and do not constitute an investment,
                                            insurance, securities or financial instrument/product. You are aware and understand that the Company
                                            provides no representation as to the legal status of the Protocol and ADA, Djed, Shen or other digital
                                            assets in any jurisdiction.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>8.9.</span> You are aware that all the User&apos;s interaction is made
                                            with the smart contracts on the Protocol rather than with a natural person or entity.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>8.10.</span> You are using the Services only for Your personal use and
                                            at Your own responsibility.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "8pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>8.11.</span> You have verified and determined that Your use of the
                                            Services does not violate any laws or regulations of any jurisdiction that applies to You.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>8.12.</span> You are responsible for determining and incurring any and
                                            all taxes assessed, incurred, or required to be collected, paid, or withheld for any reason in connection
                                            with Your use
                                        </p>
                                        <p style={{ paddingTop: "3pt", paddingLeft: "34pt", textIndent: "0pt" }}>
                                            of the Services (the “<b>Taxes</b>”). You are also solely responsible for collecting, withholding,
                                            reporting, and remitting correct Taxes to the appropriate tax authority. We are not obligated to, nor will
                                            We, determine whether Taxes apply, or calculate, collect, report, or remit any Taxes to any tax authority
                                            arising from any transaction unless so explicitly required by applicable law.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "5pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>8.13.</span> You will use the Services in good faith and in accordance
                                            with these Terms and any other policy governing the use of the Website and Services that is published on
                                            the Website from time to time.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>8.14.</span> You shall be solely responsible for maintaining the
                                            confidentiality of Your digital wallet’s private key and Wallet Information and for any and all actions
                                            and transactions performed by You or anyone else, who uses Your digital wallet’s private key.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "5pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>8.15.</span> You are aware of the risks associated with utilizing any
                                            crypto assets blockchain network, including, but not limited to, the risk of unknown vulnerabilities in or
                                            unanticipated changes to any network protocol.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>8.16.</span> You will not use the Services or the Website in connection
                                            with any activity that violates applicable laws in any relevant jurisdiction.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>8.17.</span> You have not been and are not currently involved in, and do
                                            not intend to be involved in, any type of activity associated with money laundering or terror financing.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>8.18.</span> You understand that You have no right against the Company
                                            or any other person except in the event of the Company’s breach of these Terms or intentional fraud.
                                            Neither the Company nor its representatives shall be liable for consequential, indirect, incidental,
                                            special, exemplary, punitive or enhanced damages, lost profits or revenues or diminution in value arising
                                            out of or relating to any breach of this instrument.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>8.19.</span> You shall indemnify Us and hold Us harmless from and
                                            against all claims, liabilities, damages, losses, costs and expenses, including legal fees, arising out of
                                            or in connection with any breach of these Terms by You, and any other liabilities arising out of Your use
                                            of the Services or any unauthorized use of the Services by any third party using Your digital wallet’s
                                            private key.
                                        </p>
                                    </li>
                                </ol>
                            </li>
                            <li>
                                <h2 className={cx("title-h2")} style={{ paddingTop: "5pt", paddingLeft: "34pt", textAlign: "left" }}>
                                    9. ASSUMPTION OF RISKS
                                </h2>
                                <ol className={cx("list-wrapper")} id="l11">
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>9.1.</span> There are risks associated with utilizing services involving
                                            virtual currencies and the transfer of funds and/or assets, including, but not limited to, the risk of
                                            failure of hardware, software and internet connections, malicious software introduction; the risk that
                                            third parties may obtain unauthorized access to information, including, but not limited to, public and
                                            private keys; and the risk of unknown vulnerabilities in or unanticipated changes to the network protocol.
                                            You acknowledge and accept that We have no control over the Protocol and the network and will not be
                                            responsible for any harm occurring as a result of such risks, including, but not limited to, the inability
                                            to reverse a transaction, and any losses in connection therewith due to erroneous or fraudulent actions.
                                            You agree and understand that We will not be responsible for any
                                        </p>
                                        <p style={{ paddingTop: "3pt", paddingLeft: "34pt", textIndent: "0pt" }}>
                                            communication failures, disruptions, errors, cyber attacks, hacking, distortions or delays You may
                                            experience when using the Services.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>9.2.</span> Virtual currencies in general, and Djed and Shen in
                                            particular, are not legal tender and are not backed by any sovereign government. In addition, the
                                            legislative and regulatory landscape around virtual currencies is constantly changing and may affect Your
                                            ability to use, transfer, or exchange virtual currencies.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>9.3.</span> YOU UNDERSTAND THAT THE COMPANY DID NOT CONDUCT ANY AUDIT OF
                                            THE PROTOCOL AND THE PROTOCOL POOL; ALL OF THE ADAS STORED IN THE PROTOCOL ARE SUBJECT TO CYBER-ATTACKS,
                                            HACKING OR OTHER FAILURES.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>9.4.</span> You understand that the Djed and Shen may have no value and
                                            that the Djed and Shen specifications, as detailed in the Protocol, may fail or be different from as
                                            detailed.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt", textAlign: "left" }}>
                                            <span className={cx("paragragh")}>9.5.</span> You understand that the Company has no control over the Shen
                                            Pool and the third party the Shen Pool will be delegated to, which also may affect the ability to allocate
                                            the Shen Pool’ fees on time or at all.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt", textAlign: "left" }}>
                                            <span className={cx("paragragh")}>9.6.</span> You assume any and all risks associated with the use of the
                                            Services and Website.
                                        </p>
                                    </li>
                                </ol>
                            </li>
                            <li>
                                <h2 className={cx("title-h2")} style={{ paddingTop: "8pt", paddingLeft: "34pt", textAlign: "left" }}>
                                    10. PROHIBITED ACTIVITIES
                                </h2>
                                <ol className={cx("list-wrapper")} id="l12">
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>10.1.</span> You undertake to use the Services and the Website in a
                                            respectful manner, and You undertake not to:
                                        </p>
                                        <ol className={cx("list-wrapper")} id="l13">
                                            <li>
                                                <p style={{ paddingTop: "5pt", paddingLeft: "76pt", textIndent: "-35pt" }}>
                                                    <span className={cx("paragragh")}>10.1.1.</span> link to the Services and the Website and/or use
                                                    the Services and the Website for the purpose of uploading, downloading, distributing, publishing
                                                    or transmitting
                                                </p>
                                                <p style={{ paddingLeft: "76pt", textIndent: "0pt" }}>
                                                    (a) information or other material in a manner that violates any rights, including intellectual
                                                    property rights, protection of privacy rights or any other right; (b) information or other
                                                    material that is prohibited for publication or use because it constitutes threat, harm, insult,
                                                    slander, defamation, racism or inappropriate content; (c) information or other material that
                                                    includes a virus or other software that may damage the computer systems of the Company or any
                                                    third parties or in a manner that may restrict or prevent others from using the Services or the
                                                    Website; (d) information or other material that violates any applicable law; or
                                                </p>
                                                <p style={{ paddingLeft: "76pt", textIndent: "0pt" }}>
                                                    (e) information or other material that includes an advertisement of any kind without the prior
                                                    written permission of the Company;
                                                </p>
                                            </li>
                                            <li>
                                                <p style={{ paddingTop: "6pt", paddingLeft: "76pt", textIndent: "-35pt" }}>
                                                    <span className={cx("paragragh")}>10.1.2.</span> attempt to circumvent any content filtering
                                                    techniques We employ, or attempt to access any service or area of our Services that You are not
                                                    authorized to access;
                                                </p>
                                            </li>
                                            <li>
                                                <p style={{ paddingTop: "6pt", paddingLeft: "76pt", textIndent: "-35pt" }}>
                                                    <span className={cx("paragragh")}>10.1.3.</span> introduce to the Services any virus, Trojan,
                                                    worms, logic bombs or other harmful material;
                                                </p>
                                            </li>
                                            <li>
                                                <p style={{ paddingTop: "6pt", paddingLeft: "76pt", textIndent: "-35pt" }}>
                                                    <span className={cx("paragragh")}>10.1.4.</span> develop any third-party applications that
                                                    interact with the Website without Our prior written consent;
                                                </p>
                                            </li>
                                            <li>
                                                <p style={{ paddingTop: "6pt", paddingLeft: "76pt", textIndent: "-35pt" }}>
                                                    <span className={cx("paragragh")}>10.1.5.</span> provide false, inaccurate, or misleading
                                                    information;
                                                </p>
                                            </li>
                                            <li>
                                                <p style={{ paddingTop: "8pt", paddingLeft: "76pt", textIndent: "-35pt" }}>
                                                    <span className={cx("paragragh")}>10.1.6.</span> interfere with other Users&apos; use of the
                                                    Services or the Website;
                                                </p>
                                            </li>
                                            <li>
                                                <p style={{ paddingTop: "8pt", paddingLeft: "76pt", textIndent: "-35pt" }}>
                                                    <span className={cx("paragragh")}>10.1.7.</span> use bots or other automated methods to access or
                                                    use the Services or the Website;
                                                </p>
                                            </li>
                                            <li>
                                                <p style={{ paddingTop: "3pt", paddingLeft: "76pt", textIndent: "-35pt" }}>
                                                    <span className={cx("paragragh")}>10.1.8.</span> upload or transmit (or attempt to upload or to
                                                    transmit), without the Company’s express permission, any material that acts as a passive or active
                                                    information collection or transmission mechanism, including, without limitation, web bugs, cookies
                                                    or other similar spyware devices;
                                                </p>
                                            </li>
                                            <li>
                                                <p style={{ paddingTop: "6pt", paddingLeft: "76pt", textIndent: "-35pt" }}>
                                                    <span className={cx("paragragh")}>10.1.9.</span> engage in “framing,” “mirroring,” or otherwise
                                                    simulating the appearance or function of the Services or the Website;
                                                </p>
                                            </li>
                                            <li>
                                                <p style={{ paddingTop: "6pt", paddingLeft: "76pt", textIndent: "-35pt" }}>
                                                    <span className={cx("paragragh")}>10.1.10.</span> engage, or assist, in any activity that violates
                                                    any law, statute, ordinance, regulation, or sanctions program, including any authority, or that
                                                    involves proceeds of any unlawful activity; encourage or promote any illegal activity, including,
                                                    but not limited to, copyright infringement, trademark infringement, defamation, invasion of
                                                    privacy, identity theft, hacking, cracking or distribution of counterfeit software; use the
                                                    Services to pay for, support or otherwise engage in any illegal activities, including, but not
                                                    limited to, illegal gambling, fraud, money laundering, or terrorist activities;
                                                </p>
                                            </li>
                                            <li>
                                                <p style={{ paddingTop: "6pt", paddingLeft: "76pt", textIndent: "-35pt" }}>
                                                    <span className={cx("paragragh")}>10.1.11.</span> engage in any activity that seeks to defraud Us
                                                    or any other person or entity, including (but not limited to) providing any false, inaccurate, or
                                                    misleading information in order to unlawfully obtain the property of another;
                                                </p>
                                            </li>
                                            <li>
                                                <p style={{ paddingTop: "5pt", paddingLeft: "76pt", textIndent: "-35pt" }}>
                                                    <span className={cx("paragragh")}>10.1.12.</span> engage in transactions involving items that
                                                    infringe or violate any copyright, trademark, right of publicity or privacy or any other
                                                    proprietary right under the law; use Company’s content from the Website without the express
                                                    written consent from the Company; or engage in any action that implies an untrue endorsement or
                                                    affiliation with the Company;
                                                </p>
                                            </li>
                                            <li>
                                                <p style={{ paddingTop: "6pt", paddingLeft: "76pt", textIndent: "-35pt" }}>
                                                    <span className={cx("paragragh")}>10.1.13.</span> communicate with other Users for purposes of (1)
                                                    sending unsolicited advertising or promotions, requests for donations, or spam; (2) engaging in
                                                    hate speech or harassing or abusing other Users; (3) interfering with transactions of other Users;
                                                </p>
                                            </li>
                                            <li>
                                                <p style={{ paddingTop: "5pt", paddingLeft: "76pt", textIndent: "-35pt" }}>
                                                    <span className={cx("paragragh")}>10.1.14.</span> make any changes and/or interfere in any way in
                                                    the source code of the Services or the Website and upload any software and/or application that may
                                                    harm or cause damage to the Company, the Services, the Website or any other third party;
                                                </p>
                                            </li>
                                            <li>
                                                <p style={{ paddingTop: "6pt", paddingLeft: "76pt", textIndent: "-35pt" }}>
                                                    <span className={cx("paragragh")}>10.1.15.</span> disassemble, decompile or otherwise reverse
                                                    engineer any software or other technology included in the Services or used to provide the
                                                    Services;
                                                </p>
                                            </li>
                                            <li>
                                                <p style={{ paddingTop: "6pt", paddingLeft: "76pt", textIndent: "-35pt" }}>
                                                    <span className={cx("paragragh")}>10.1.16.</span> engage in any copying, modification, or
                                                    otherwise appropriation of the Website or any material owned by the Company as part of your use of
                                                    the Website without express written permission from the Company for the proposed copying,
                                                    modification, or appropriation of the Website; and
                                                </p>
                                            </li>
                                            <li>
                                                <p style={{ paddingTop: "6pt", paddingLeft: "76pt", textIndent: "-35pt" }}>
                                                    <span className={cx("paragragh")}>10.1.17.</span> encourage or induce any other person to engage
                                                    in any of the activities prohibited under this Section.
                                                </p>
                                            </li>
                                        </ol>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "76pt", textIndent: "-35pt" }}>
                                            <span className={cx("paragragh")}>10.2.</span> We reserve the right (which does not constitute the
                                            obligation of Ours) at all times to monitor, review, screen, retain and/or disclose any information
                                            (directly
                                        </p>
                                        <p style={{ paddingTop: "3pt", paddingLeft: "76pt", textIndent: "0pt" }}>
                                            or using third parties) related to Your use of the Website and Services as necessary to satisfy any
                                            applicable law, regulation, blacklisted wallets, transaction monitoring, sanctions programs, legal process
                                            or governmental request and to ensure Your compliance with these Terms and any other policy governing the
                                            use of the Website and Services that is published on the Website from time to time, and You hereby
                                            explicitly agree and consent to Our right to do so.
                                        </p>
                                    </li>
                                </ol>
                            </li>
                            <li>
                                <h2 className={cx("title-h2")} style={{ paddingTop: "5pt", paddingLeft: "34pt" }}>
                                    11. DISCLAIMER
                                </h2>
                                <ol className={cx("list-wrapper")} id="l14">
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>11.1.</span> YOUR ACCESS TO AND USE OF THE WEBSITE AND THE SERVICES ARE
                                            AT YOUR OWN RISK. YOU UNDERSTAND AND AGREE THAT THE WEBSITE IS PROVIDED ON AN “AS IS” AND “AS AVAILABLE”
                                            BASIS AND THE COMPANY EXPRESSLY DISCLAIMS WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED.
                                            COMPANY (AND ITS SUPPLIERS) MAKE NO WARRANTY OR REPRESENTATION AND DISCLAIM ALL RESPONSIBILITY FOR WHETHER
                                            THE WEBSITE: (A) WILL MEET YOUR REQUIREMENTS; (B) WILL BE AVAILABLE ON AN UNINTERRUPTED, TIMELY, SECURE,
                                            OR ERROR-FREE BASIS; OR (C) WILL BE ACCURATE, RELIABLE, COMPLETE, LEGAL, OR SAFE. COMPANY DISCLAIMS ALL
                                            OTHER WARRANTIES OR CONDITIONS, EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION, IMPLIED WARRANTIES OR
                                            CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. COMPANY WILL
                                            NOT BE LIABLE FOR ANY LOSS OF ANY KIND FROM ANY ACTION TAKEN OR TAKEN IN RELIANCE ON MATERIAL OR
                                            INFORMATION, CONTAINED ON THE WEBSITE. WHILE COMPANY ATTEMPTS TO MAKE YOUR ACCESS TO AND USE OF THE
                                            WEBSITE SAFE, COMPANY CANNOT AND DOES NOT REPRESENT OR WARRANT THAT THE WEBSITE OR THE SERVICES ARE FREE
                                            OF VIRUSES OR OTHER HARMFUL COMPONENTS. WE CANNOT GUARANTEE THE SECURITY OF ANY DATA THAT YOU DISCLOSE
                                            ONLINE. NO ADVICE OR INFORMATION, WHETHER ORAL OR OBTAINED FROM THE COMPANY OR THROUGH THE WEBSITE, WILL
                                            CREATE ANY WARRANTY OR REPRESENTATION NOT EXPRESSLY MADE HEREIN. YOU ACCEPT THE INHERENT SECURITY RISKS OF
                                            PROVIDING INFORMATION AND DEALING ONLINE OVER THE INTERNET AND WILL NOT HOLD COMPANY RESPONSIBLE FOR ANY
                                            BREACH OF SECURITY.
                                        </p>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt", textIndent: "0pt" }}>
                                            SIMILARLY, THE PROTOCOL FUNCTIONS AUTONOMOUSLY IN &quot;AS IS&quot; CONDITION AND YOU ACCESS IT AT YOUR
                                            OWN RISK, AND WITHOUT WARRANTIES OF ANY KIND. WE DO NOT PROVIDE, OWN, OR CONTROL THE PROTOCOL, WHICH IS
                                            RUN AUTONOMOUSLY WITHOUT ANY HEADCOUNT BY SMART CONTRACTS DEPLOYED ON CARDANO BLOCKCHAIN. UPGRADES AND
                                            MODIFICATIONS TO THE PROTOCOL ARE GENERALLY MANAGED IN A COMMUNITY-DRIVEN WAY BY HOLDERS OF THE SHEN
                                            TOKEN. NO DEVELOPER OR ENTITY INVOLVED IN CREATING THE PROTOCOL WILL BE LIABLE FOR ANY CLAIMS OR DAMAGES
                                        </p>
                                        <p style={{ paddingTop: "3pt", paddingLeft: "34pt", textIndent: "0pt" }}>
                                            WHATSOEVER ASSOCIATED WITH YOUR USE, INABILITY TO USE, OR YOUR INTERACTION WITH OTHER USERS OF, THE
                                            PROTOCOL, INCLUDING ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, PUNITIVE OR CONSEQUENTIAL
                                            DAMAGES, OR LOSS OF PROFITS, CRYPTOCURRENCIES, TOKENS, OR ANYTHING ELSE OF VALUE. WE DO NOT ENDORSE,
                                            GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY ADVERTISEMENTS, OFFERS, OR STATEMENTS MADE BY THIRD PARTIES
                                            CONCERNING THE WEBSITE, THE SERVICES, OR THE PROTOCOL.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>11.2.</span> THE CONTENT AND MATERIALS AVAILABLE ON THE WEBSITE ARE FOR
                                            INFORMATIONAL PURPOSES ONLY AND ARE NOT INTENDED TO ADDRESS YOUR PARTICULAR REQUIREMENTS OR NEEDS. IN
                                            PARTICULAR, THE CONTENT AND MATERIALS AVAILABLE ON THE WEBSITE DO NOT CONSTITUTE ANY FORM OF ADVICE,
                                            REFERRAL OR RECOMMENDATION BY US; THEY SHOULD NOT BE REGARDED AS AN OFFER, SOLICITATION, INVITATION OR
                                            RECOMMENDATION TO BUY OR SELL DIGITAL ASSETS OR ANY FINANCIAL SERVICES AND ARE NOT INTENDED TO BE RELIED
                                            UPON BY YOU IN MAKING ANY SPECIFIC DECISION TO BUY OR SELL A DITIAL ASSET. WE RECOMMEND THAT YOU SEEK
                                            INDEPENDENT ADVICE FROM FINANCIAL, LEGAL AND TAX ADVISORS BEFORE MAKING ANY SUCH DECISION AND USING THE
                                            SERVICES, PARTICULARLY IN LIGHT OF THE RISKS ASSOCIATED WITH DIGITAL ASSETS.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>11.3.</span>NOTHING INCLUDED ON THE WEBSITE CONSTITUTES AN OFFER OR
                                            SOLICITATION TO SELL OR DISTRIBUTE SECURITIES OR INVESTMENTS AND RELATED SERVICES TO ANYONE IN ANY
                                            JURISDICTION.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "5pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>11.4.</span> THE REGULATORY ENVIRONMENT CONCERNING CRYPTOCURRENCIES AND
                                            OTHER DIGITAL ASSETS CONTINUES TO DEVELOP. THE APPLICATION AND INTERPRETATION OF EXISTING LAWS AND
                                            REGULATIONS ARE OFTEN LARGELY UNTESTED AND THERE IS A LACK OF CERTAINTY AS TO HOW THEY WILL BE APPLIED.
                                            NEW LAWS AND REGULATIONS WILL BE PROMULGATED IN THE FUTURE THAT APPLY TO BLOCKCHAIN TECHNOLOGY AND DIGITAL
                                            ASSETS, AND RELATED SERVICE PROVIDERS, AND NO ASSURANCE CAN BE GIVEN THAT ANY SUCH CHANGES WILL NOT
                                            ADVERSELY AFFECT DIGITAL ASSETS GENERALLY OR THE SERVICES. IT IS NOT POSSIBLE TO PREDICT HOW SUCH CHANGES
                                            WOULD AFFECT THE PRICE AND LIQUIDITY OF DIGITAL ASSETS GENERALLY OR THE SERVICES.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>11.5.</span> REGULATORY ACTIONS COULD NEGATIVELY IMPACT CRYPTOCURRENCIES
                                            AND OTHER DIGITAL ASSETS IN VARIOUS WAYS, INCLUDING, FOR PURPOSES OF ILLUSTRATION ONLY, THROUGH A
                                            DETERMINATION (WITH RETROSPECTIVE OR PROSPECTIVE EFFECT) THAT DIGITAL ASSETS ARE REGULATED FINANCIAL
                                            INSTRUMENTS OR SECURITIES REQUIRING REGISTRATION OR LICENSING IN CERTAIN JURISDICTIONS. THE COMPANY MAY
                                            HAVE TO LIMIT THE AVAILABILITY
                                        </p>
                                        <p style={{ paddingTop: "3pt", paddingLeft: "34pt", textIndent: "0pt" }}>
                                            OF CERTAIN SERVICES OR DISALLOW USERS BASED ON THEIR CITIZENSHIP, RESIDENCE OR LOCATION FROM ENGAGING IN
                                            THE SERVICES OR ACCESSING THE WEBSITE IF DOING SO BECOMES COMMERCIALLY UNSUSTAINABLE OR LEGALLY
                                            PROHIBITED.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>11.6.</span> THE DJED AND SHEN TOKENS ARE NOT INTENDED TO CONSTITUTE
                                            SECURITIES AND/OR COLLECTIVE INVESTMENT UNITS IN PROTOCOL.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>11.7.</span> DJED AND SHEN EXIST ONLY BY VIRTUE OF THE OWNERSHIP RECORD
                                            MAINTAINED IN THE ASSOCIATED BLOCKCHAIN (E.G., CARDANO NETWORK). ANY TRANSFERS OR SALES OCCUR ON THE
                                            ASSOCIATED BLOCKCHAIN (E.G., CARDANO). THE COMPANY AND/OR ANY OF ITS AFFILIATES CANNOT EFFECT OR OTHERWISE
                                            CONTROL THE TRANSFER OF TITLE OR RIGHT IN ANY DJED, SHEN, OR OTHER DIGITAL ASSETS OR UNDERLYING OR
                                            ASSOCIATED CONTENT OR ITEMS.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "5pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>11.8.</span> THE COMPANY AND THE COMPANY’S PARTIES (AS DEFINED BELOW IN
                                            THESE TERMS) WILL NOT BE RESPONSIBLE OR LIABLE TO YOU FOR ANY LOSSES YOU INCUR AS A RESULT OF YOUR USE OF
                                            THE CARDANO NETWORK OR ANY BLOCKCHAIN NETWORK, OR ANY ELECTRONIC WALLET, INCLUDING, BUT NOT LIMITED TO,
                                            ANY LOSSES, DAMAGES OR CLAIMS ARISING FROM: (A) USER ERROR, SUCH AS FORGOTTEN PASSWORDS OR INCORRECTLY
                                            CONSTRUED SMART CONTRACTS OR OTHER TRANSACTIONS; (B) SERVER FAILURE OR DATA LOSS; (C) CORRUPTED WALLET
                                            FILES; (D) INTELLECTUAL PROPERTY INFRINGEMENT BY THIRD PARTIES; AND (E) UNAUTHORIZED ACCESS OR ACTIVITIES
                                            BY THIRD PARTIES, INCLUDING, BUT NOT LIMITED TO, THE USE OF VIRUSES, PHISHING, BRUTEFORCING OR OTHER MEANS
                                            OF ATTACK AGAINST THE TOOLS, CARDANO NETWORK, OR ANY OTHER BLOCKCHAIN NETWORK, OR ANY ELECTRONIC WALLET.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>11.9.</span> THE COMPANY AND THE COMPANY’S PARTIES (AS DEFINED BELOW IN
                                            THESE TERMS) ARE NOT RESPONSIBLE FOR LOSSES DUE TO BLOCKCHAIN OR ANY OTHER FEATURES OF THE CARDANO
                                            NETWORK, OR ANY OTHER BLOCKCHAIN NETWORK, OR ANY ELECTRONIC WALLET, INCLUDING, BUT NOT LIMITED TO, LATE
                                            REPORTS BY DEVELOPERS OR REPRESENTATIVES (OR NO REPORT AT ALL) OF ANY ISSUES WITH THE BLOCKCHAIN
                                            SUPPORTING THE CARDANO NETWORK, INCLUDING FORKS, TECHNICAL NODE ISSUES, OR ANY OTHER ISSUES CAUSING LOSSES
                                            AS A RESULT.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>11.10.</span> Some jurisdictions do not allow the exclusion of implied
                                            warranties in contracts with consumers, so the above exclusion may not apply to You.
                                        </p>
                                    </li>
                                </ol>
                            </li>
                            <li>
                                <h2 className={cx("title-h2")} style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                    12. LIMITATION OF LIABILITY
                                </h2>
                                <ol className={cx("list-wrapper")} id="l15">
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>12.1.</span> TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT WILL
                                            COMPANY, THE COMPANY’S PARTIES (AS DEFINED BELOW IN THESE TERMS) OR REPRESENTATIVES, BE LIABLE TO YOU OR
                                            ANY THIRD PARTY
                                        </p>
                                        <p style={{ paddingTop: "3pt", paddingLeft: "34pt", textIndent: "0pt" }}>
                                            FOR ANY LOST PROFIT OR ANY INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL OR PUNITIVE DAMAGES
                                            ARISING FROM THESE TERMS, THE WEBSITE, SERVICES OR THIRD PARTY SITES AND SERVICES, OR FOR ANY DAMAGES
                                            RELATED TO LOSS OF REVENUE, LOSS OF PROFITS, LOSS OF BUSINESS OR ANTICIPATED SAVINGS, LOSS OF USE, LOSS OF
                                            GOODWILL, OR LOSS OF DATA, AND WHETHER CAUSED BY TORT (INCLUDING NEGLIGENCE), BREACH OF CONTRACT, OR
                                            OTHERWISE, EVEN IF FORESEEABLE AND EVEN IF COMPANY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                                            ACCESS TO, AND USE OF, THE WEBSITE, SERVICES OR THIRD PARTY WEBSITES AND PRODUCTS ARE AT YOUR OWN
                                            DISCRETION AND RISK, AND YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM OR MOBILE
                                            DEVICE OR LOSS OF DATA RESULTING THEREFROM.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "5pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>12.2.</span> NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN,
                                            IN NO EVENT SHALL THE MAXIMUM AGGREGATE LIABILITY OF COMPANY ARISING OUT OF OR IN ANY WAY RELATED TO THIS
                                            AGREEMENT, THE ACCESS TO AND USE OF THE WEBSITE, ITS CONTENT, OR SERVICES EXCEED THE LOWEST OF (A) $100 OR
                                            (B) THE MINIMUM AMOUNT ALLOWED UNDER APPLICABLE LAW. THE FOREGOING LIMITATIONS OF LIABILITY SHALL NOT
                                            APPLY TO LIABILITY OF COMPANY FOR (A) DEATH OR PERSONAL INJURY CAUSED BY COMPANY’S NEGLIGENCE; OR FOR (B)
                                            ANY INJURY CAUSED BY COMPANY’S FRAUD OR FRAUDULENT MISREPRESENTATION.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>12.3.</span> Some jurisdictions do not allow the exclusion or limitation
                                            of incidental or consequential damages, so the above limitation or exclusion may not apply to You. Some
                                            jurisdictions also limit disclaimers or limitations of liability for personal injury from consumer
                                            products, so this limitation may not apply to personal injury claims. The foregoing limitation of
                                            liability shall apply to the fullest extent permitted by law in the applicable jurisdiction
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>12.4.</span> The Company assumes no liability or responsibility for any
                                            (a) errors, mistakes, or inaccuracies of any content included in the Services; (b) any interruption or
                                            cessation of transmission to or from the Website or via the Services; and (c) any bugs, viruses, Trojan
                                            horses, or the like that may be transmitted to or through the Services or the Website by any third party.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "5pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>12.5.</span> The Company is not responsible for any problems or
                                            technical malfunction of any telephone or network lines, computer online systems, servers or providers,
                                            hardware, software, failure due to technical problems or traffic congestion on the internet (or
                                            inaccessibility of the internet) or incompatibility between the Website or the Services and Your browser
                                            and/or other equipment and/or the systems. The Company does not assume any responsibility or risk for Your
                                            use of the internet.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>12.6.</span> Under no circumstances will the Company be required to
                                            deliver to You any virtual currency or digital assets as damages, specific performance or any other
                                            remedy. If You
                                        </p>
                                        <p style={{ paddingTop: "3pt", paddingLeft: "34pt", textIndent: "0pt" }}>
                                            base Your calculations of damages in any way on the value of a virtual currency or other digital assets,
                                            You and the Company agree that the calculation will be based on the lowest value of the virtual currency
                                            or other digital assets during the period between the accrual of the claim and the award of damages.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>12.7.</span> The Company will not be responsible or liable to You for
                                            any loss and takes no responsibility for damages or claims arising in whole or in part, directly or
                                            indirectly from: (a) user error such as forgotten Wallet Information, incorrectly constructed
                                            transactions, or mistyped wallet addresses; (b) server failure or data loss; (c) corrupted or otherwise
                                            non-performing address or wallet; (d) unauthorized access to applications; and (e) any unauthorized
                                            activities, including, without limitation, the use of hacking, viruses, phishing, brute forcing or other
                                            means of attack against the Services or the Website.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>12.8.</span> Please note that despite the rules and guidelines in the
                                            Terms, it is possible that others might access or use the Services in ways that are deceptive, fraudulent,
                                            defamatory, harmful, unlawful, offensive or otherwise objectionable. The Company makes no representation
                                            or warranty whatsoever with regard to the conduct of any User or other third party on or in connection
                                            with the Services or the Website, whether online or offline, whether in connection with any transaction,
                                            User content or otherwise.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>12.9.</span> The Company may make improvements and/or changes to the
                                            Website or Services at any time. The Company does not represent that the Website or Services are
                                            appropriate for use in all locations and persons who have access to the Website or Services do so on their
                                            own initiative and are responsible for compliance with local laws of and to the extent applicable.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>12.10.</span> The Company reserves the right to fully cooperate with any
                                            law enforcement authorities or court order requesting or directing it to disclose the identity of anyone
                                            taking any actions and/or omissions that are believed to violate the Terms.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "5pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>12.11.</span> Due to the nature of the Services provided by the Company,
                                            certain data may be susceptible to hacking attacks despite the measures taken by the Company. The Company
                                            shall not be responsible for any theft, loss, disappearance or destruction of cryptocurrencies while being
                                            transferred in the course of providing the Services.
                                        </p>
                                    </li>
                                </ol>
                            </li>
                            <li>
                                <h2 className={cx("title-h2")} style={{ paddingTop: "6pt", paddingLeft: "34pt", textAlign: "left" }}>
                                    13. INDEMNIFICATION
                                </h2>
                                <ol className={cx("list-wrapper")} id="l16">
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>13.1.</span> To the fullest extent permitted by applicable law, You
                                            agree to indemnify, defend and hold harmless the Company, and Our respective past, present and future
                                            employees, officers, directors, contractors, advisors, consultants, shareholders, equity holders,
                                            suppliers, vendors, service providers, parent companies, subsidiaries, affiliates, agents,
                                            representatives, predecessors, successors and assigns (individually and collectively, the “
                                            <b>Company’s Parties</b>”), from and against all actual or alleged claims, damages, awards, judgments,
                                            losses, liabilities, obligations, penalties, interest, fees, expenses (including, without limitation,
                                            attorneys’ fees and expenses) and costs (including, without limitation, court costs, costs of settlement
                                            and costs of pursuing indemnification and insurance), of every kind and nature whatsoever, whether known
                                            or unknown, foreseen or unforeseen,
                                        </p>
                                        <p style={{ paddingTop: "3pt", paddingLeft: "34pt", textIndent: "0pt" }}>
                                            matured or unmatured, or suspected or unsuspected, in law or equity, whether in tort, contract or
                                            otherwise (collectively, “<b>Claims</b>”), including, but not limited to, damages to property or personal
                                            injury, that are caused by, arise out of or are related to (a) Your use or misuse of the Services, the
                                            Website, or anything posted on the Website, (b) Your violation of these Terms, (c) Your violation of the
                                            rights of a third party, including another User, and/or (d) your failure to pay any withholding taxes or
                                            sales taxes in connection with your use of Services. You agree to promptly notify Company’s Parties of any
                                            Claims and cooperate with the Company’s Parties in defending such Claims. You further agree that the
                                            Company’s Parties shall have control of the defense or settlement of any third-party Claims. This
                                            indemnity shall apply to Your successors and assigns and shall survive any termination or cancellation of
                                            these Terms.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "5pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>13.2.</span> You agree to hold the Company’s Parties harmless for any
                                            losses caused, directly or indirectly, to You, with respect to the Website and/or the Services, and You
                                            only shall bear sole responsibility for any of Your decisions made relying on the content of the Website
                                            or Services.
                                        </p>
                                    </li>
                                </ol>
                            </li>
                            <li>
                                <h2 className={cx("title-h2")} style={{ paddingTop: "6pt", paddingLeft: "34pt", textAlign: "left" }}>
                                    14. INTELLECTUAL PROPERTY RIGHTS
                                </h2>
                                <ol className={cx("list-wrapper")} id="l17">
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>14.1.</span> The Website, the Services and their content, including the
                                            video materials, text, photos, logos, designs, music, sound, figures, trademarks, graphs, sheets,
                                            statistics, currency exchange quotations and any other content embodied on the Website or Services are
                                            protected by intellectual property rights of the Company, Company’s Parties, Company’s licensors, or third
                                            parties. Unlike the Website and the Services, the Protocol is comprised entirely of open-source or
                                            source-available software running on public blockchain.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>14.2.</span> We hereby grant you a limited, non-exclusive,
                                            non-transferable, revocable license to access and use the Website and Services. Our grant of such license
                                            is subject to your compliance with these Terms.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>14.3.</span> You may only use the Website and/or the Services for
                                            personal, lawful and non- commercial use. Any other use of the Website and/or the Services is strictly
                                            prohibited.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>14.4.</span> You agree not to infringe or enable others to infringe Our
                                            intellectual property rights and the intellectual property rights of Company’s Parties, Company’s
                                            licensors, or third parties.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "5pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>14.5.</span> You may not sell or modify materials derived or created
                                            from the Website or Services or reproduce, display, publicly perform, distribute or otherwise use the
                                            materials in any way for any public or commercial purpose. Your use of the materials on any other website
                                            or on a file-sharing or similar service for any purpose is strictly prohibited. You may not copy any
                                            material or content derived or created from the Website or Services without Our express, written
                                            permission.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>14.6.</span> Any rights not expressly granted herein to use the
                                            materials contained on or through the Website or Services are reserved by Us in full.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>14.7.</span> You shall not, nor shall You allow any other party to,
                                            modify, decompile, disassemble, reverse engineer, copy, transfer, create derivative works from, rent,
                                            sub-license,
                                        </p>
                                        <p style={{ paddingTop: "3pt", paddingLeft: "34pt", textIndent: "0pt" }}>
                                            distribute, reproduce framed, republish, scrape, download, display, transmit, post, lease or sell in any
                                            form or by any means, in whole or in part, use for any purpose other than for using the Website or the
                                            Services pursuant to the Terms, or otherwise exploit any of the contents of the Website or Services
                                            without the Company’s explicit, prior written permission.
                                        </p>
                                    </li>
                                </ol>
                            </li>
                            <li>
                                <h2 className={cx("title-h2")} style={{ paddingTop: "5pt", paddingLeft: "34pt", textAlign: "left" }}>
                                    15. TERMINATION
                                </h2>
                                <ol className={cx("list-wrapper")} id="l18">
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>15.1.</span> If You breach any of the provisions of these Terms, any
                                            other policy governing the use of the Website and Services that is published on the Website from time to
                                            time, or any applicable law, all licenses granted by the Company will terminate automatically.
                                            Additionally, notwithstanding anything contained in these Terms, we reserve the right, with or without
                                            notice and in our sole discretion, to track Your use of the Services and the Website, to suspend, disable,
                                            terminate, or delete Your account and/or Your ability to access or use the Website or the Services (or any
                                            part of the foregoing) and/or block Your wallet address from using the Website or the Services at any time
                                            and for any or no reason, and perform any other action the Company may deem appropriate to protect its
                                            property and/or rights and/or rights of third parties. You acknowledge and agree that We shall have no
                                            liability or obligation to You in such event and that You will not be entitled to a refund of any amounts
                                            that You have already paid to us. Furthermore, the Company has the right, at any time, in its sole
                                            discretion and without providing any notice, to stop or terminate the Services and/or to stop or cease
                                            operating the Website, without having any liability.
                                        </p>
                                    </li>
                                </ol>
                            </li>
                            <li>
                                <h2 className={cx("title-h2")} style={{ paddingTop: "6pt", paddingLeft: "34pt", textAlign: "left" }}>
                                    16. THIRD PARTY SERVICES OR CONTENT{" "}
                                </h2>
                                <ol className={cx("list-wrapper")} id="l19">
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>16.1.</span> While using the Services, You may view content or services
                                            provided or sources that are controlled or offered by third parties (the &quot;<b>Third-Party Content</b>
                                            &quot;).
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>16.2.</span> We have not reviewed any or all of such Third-Party Content
                                            and are not responsible for any Third-Party Content. We do not control, endorse, or adopt such Third-Party
                                            Content or services. When using or relying on Third-Party Content, You must consider that it may not be
                                            accurate or current. We are not responsible for Third-Party Content, including, without limitation,
                                            material that may be misleading, incomplete, erroneous, offensive, indecent or otherwise objectionable in
                                            Your jurisdiction. In addition, Your dealings or correspondence with the third parties that provided the
                                            Third-Party Content are solely between You and such third parties.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>16.3.</span> The Third-Party Content is provided solely for Your
                                            convenience, and You agree that under no circumstances will You hold Us liable for any loss or damage
                                            caused by use of or reliance on any Third-Party Content, or goods or services available on other websites.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "5pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>16.4.</span> Accordingly, We recommend that You independently verify all
                                            information before relying on it, and any decisions or actions taken based upon Third-Party Content is at
                                            Your sole responsibility.
                                        </p>
                                    </li>
                                </ol>
                            </li>
                            <li>
                                <h2 className={cx("title-h2")} style={{ paddingTop: "6pt", paddingLeft: "34pt", textAlign: "left" }}>
                                    17. LINKS
                                </h2>
                                <ol className={cx("list-wrapper")} id="l20">
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>17.1.</span> The Website and the Services may contain links, content,
                                            advertisements, promotions, logos and other materials to other websites that are controlled or offered by
                                            third parties
                                        </p>
                                        <p style={{ paddingTop: "3pt", paddingLeft: "34pt", textIndent: "0pt" }}>
                                            (the “<b>Links</b>”). We caution You to ensure that You understand the risks involved in using such
                                            websites or materials before retrieving, using, relying upon or purchasing anything via these websites or
                                            based on such materials. Such Links are provided solely for Your convenience, and You agree that under no
                                            circumstances will You hold Us liable for any loss or damage caused by use of or reliance on any content,
                                            goods or services available on other websites and services.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>17.2.</span> The inclusion of Links on the Website or Services is not an
                                            endorsement, authorization, sponsorship, affiliation or any other connection between the Company or those
                                            websites or their operators.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "5pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>17.3.</span> We have not reviewed any or all of such Links and are not
                                            responsible for any of the content of the websites referred thereby. We caution You to ensure that You
                                            understand the risks involved in using such websites before retrieving, using, relying upon or purchasing
                                            anything via these websites.
                                        </p>
                                    </li>
                                </ol>
                            </li>
                            <li>
                                <h2 className={cx("title-h2")} style={{ paddingTop: "6pt", paddingLeft: "34pt", textAlign: "left" }}>
                                    18. MISCELLANEOUS
                                </h2>
                                <ol className={cx("list-wrapper")} id="l21">
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>18.1.</span> We may, at Our sole discretion, amend, modify, or
                                            discontinue, from time to time, any of the Services and/or introduce new Services and/or the Website
                                            (including the documents in it and the whitepaper). We shall not be liable for any loss suffered by You
                                            resulting from any such changes made and You shall have no claims against Us in such regard.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>18.2.</span> You hereby agree that transmission of information to or
                                            from the Website or Services does not create any relationship between You and the Company that deviates
                                            from that specified in these Terms.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "5pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>18.3.</span> These Terms, as amended from time to time, constitute the
                                            only valid agreements between You and the Company, and no representation, promise, consent or undertaking,
                                            whether written or oral, that is not included in the Terms will be binding upon the parties.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <a
                                                href="mailto:contact@djed.xyz"
                                                target="_blank"
                                                rel="noreferrer"
                                                style={{ color: "white", fontStyle: "normal", textDecoration: "none", fontSize: "16px" }}
                                            >
                                                <span className={cx("paragragh")}>18.4.</span> We will use our best efforts to resolve any potential
                                                disputes through informal, good faith negotiations. If a potential dispute arises, You must contact us
                                                first by sending an email to{" "}
                                            </a>
                                            <span className="s4">contact@djed.xyz</span> so that We can attempt to resolve it without resorting to
                                            formal dispute resolution. If We aren&apos;t able to reach an informal resolution within sixty days of
                                            confirming the receipt of Your email, then any dispute regarding the validity, breach, interpretation,
                                            performance or otherwise arising out of or in connection with these Terms or the relationship between You
                                            and Us shall be resolved{" "}
                                            <span>
                                                exclusively and finally by confidential binding arbitration in accordance with the procedures set
                                                forth in this section. The arbitration shall be conducted in the
                                            </span>
                                            British Virgin Islands
                                            <span>
                                                . The arbitration proceedings will be conducted in accordance with, and pursuant to, the then most
                                                applicable rules of arbitration (the &quot;Arbitration Rules&quot;) of the International Chamber of
                                                Commerce. A single neutral arbitrator (the &quot;Arbitrator&quot;) shall be selected pursuant to the
                                                Arbitration Rules; provided, however, that, notwithstanding the Arbitration Rules, each party shall
                                                have the right to pre-emptively challenge any Arbitrator that has previously arbitrated any matter for
                                                either Party. The Arbitrator will have the same power (but no greater power) to grant all appropriate
                                                legal and equitable relief, both
                                            </span>
                                        </p>
                                        <p style={{ paddingTop: "3pt", paddingLeft: "34pt", textIndent: "0pt" }}>
                                            by way of interim relief and as a part of the final award, as may be granted by any court of competent
                                            jurisdiction, in order to carry out these Terms (including declaratory and injunctive relief and damages).
                                            The Arbitrator shall render an award and written opinion explaining the award, and the decisions and award
                                            of the Arbitrator shall be final and binding upon the Parties. All awards and orders of the Arbitrator,
                                            including interim relief, may be enforced by any court of competent jurisdiction. The Parties agree that
                                            the award of the Arbitrator may be enforced against them or their assets wherever they may be found and
                                            that a judgment upon the award may be entered in any court having jurisdiction thereof. The Parties hereto
                                            hereby waive to the fullest extent permitted by applicable law any rights to appeal or to review of such
                                            award by any court or tribunal. In the event of any conflict between the Arbitration Rules and the
                                            provisions of this section shall control.{" "}
                                            <span>
                                                Without derogating of the above, these Terms and the relationship between You and Us shall be governed
                                                by, and construed and interpreted in accordance with, the laws of the British Virgin Islands, without
                                                regard to principles of conflict of laws. You further agree that the Website shall be deemed to be
                                                based solely in the British Virgin Islands, and that although the Website may be available in other
                                                jurisdictions, its availability does not give rise to general or specific personal jurisdiction in any
                                                forum outside the British Virgin Islands.
                                            </span>
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>18.5.</span> You must bring any and all disputes and claims against Us
                                            in Your individual capacity and not as a plaintiff in or member of any purported class action, collective
                                            action, private attorney general action, or other representative proceeding. This provision applies to
                                            class arbitration as well.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>18.6.</span> No failure or delay on Our part in exercising any right,
                                            power or remedy thereunder shall operate as a waiver thereof, nor shall any single or partial exercise of
                                            any such right, power or remedy preclude any other or further exercise thereof or the exercise of any
                                            other right, power or remedy.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>18.7</span> If any provision of these Terms is held to be unenforceable
                                            under applicable law, then such provision shall be excluded from these Terms and the remainder of these
                                            Terms shall be interpreted as if such provision was so excluded and shall be enforceable in accordance
                                            with its terms, provided, however, that in such event, these Terms shall be interpreted so as to give
                                            effect, to the greatest extent consistent with and permitted by applicable law, to the meaning and
                                            intention of the excluded provision as determined by such court of competent jurisdiction.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "5pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>18.8.</span> You agree that a breach of these Terms will cause
                                            irreparable injury to the Company for which monetary damages would not be an adequate remedy and the
                                            Company shall be entitled to equitable relief in addition to any remedies it may have hereunder or at law
                                            without a bond, other security, or proof of damages.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>18.9.</span> We may transfer or assign any and all of Our rights and
                                            obligations hereunder to any third party. Without derogating from the above, the Website and/or any of the
                                            Services may be operated by third parties. You may not transfer, assign or pledge in any manner whatsoever
                                            any of Your rights or obligations under these Terms.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "3pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>18.10.</span> The terms and provisions of these Terms are binding upon
                                            Your heirs, successors, assigns, and other representatives.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "42pt", textIndent: "-36pt", textAlign: "left" }}>
                                            <span className={cx("paragragh")}>18.11.</span> You assume any and all risks associated with the use of
                                            the Website and the Services.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "8pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>18.12.</span> You agree to accept communications from Us in an
                                            electronic format, and agree that all terms, conditions, agreements, notices, disclosures or other
                                            communications that We provide to You electronically will be considered to be “in writing”.
                                        </p>
                                    </li>
                                    <li>
                                        <p style={{ paddingTop: "6pt", paddingLeft: "34pt" }}>
                                            <span className={cx("paragragh")}>18.13.</span> Any heading, caption or section title contained herein is
                                            inserted only as a matter of convenience, and in no way defines or explains any section or provision
                                            hereof.
                                        </p>
                                    </li>
                                </ol>
                            </li>
                        </ol>
                    </div>
                </div>

                {/* Go here */}
            </div>
        </div>
    );
};

export default Term;
