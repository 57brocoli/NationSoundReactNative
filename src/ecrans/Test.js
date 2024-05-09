import {View, Text, ScrollView, TouchableOpacity, Button} from 'react-native';
import React, {useRef} from 'react';
import GoogleRecaptcha, {
    GoogleRecaptchaSize,
    GoogleRecaptchaToken,
    GoogleRecaptchaRefAttributes,
} from 'react-native-google-recaptcha';

const Test = props => {
    const scrollViewRef = useRef(null);
    const sectionRef = useRef(null);

    const scrollToSection = () => {
        if (scrollViewRef.current && sectionRef.current) {
            sectionRef.current.measureLayout(scrollViewRef.current, (x, y) => {
                scrollViewRef.current.scrollTo({y, animated: true});
            });
        }
    };
    const recaptchaRef = useRef(GoogleRecaptchaRefAttributes);

    const handleSend = () => {
        recaptchaRef.current?.open();
    };
    const handleSend2 = async () => {
        try {
            const token = await recaptchaRef.current.getToken();

            console.log('Recaptcha Token:', token);
        } catch (e) {
            console.error('Recaptcha Error:', e);
        }
    };

    const handleVerify = () => {
        console.log('Recaptcha Token:');
    };

    return (
        <View style={{flex: 1}}>
            <ScrollView ref={scrollViewRef}>
                <Button title="Send" onPress={handleSend2} />
                <GoogleRecaptcha
                    ref={recaptchaRef}
                    baseUrl="https://pixelevent.site"
                    size={GoogleRecaptchaSize.INVISIBLE}
                    onVerify={handleVerify}
                    siteKey="6LeR8MYpAAAAAHqT4Y3Fwvb6MR3a63V9PZOZX9ti"
                    lang="fr"
                />
                <View style={{padding: 20}}>
                    <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut amet voluptatibus cumque illo velit
                        dolor cupiditate recusandae, consequatur dolorum odio ipsa perferendis placeat minus nisi.
                        Explicabo ex vel, incidunt, harum, necessitatibus ipsum ut error esse accusantium consectetur
                        natus architecto minus? Rem porro ducimus blanditiis distinctio molestiae vel modi doloribus,
                        harum corrupti minus maxime aperiam. Nulla debitis saepe consectetur beatae voluptatibus
                        laboriosam, repudiandae, nemo aspernatur atque non quaerat eos veritatis ipsam numquam incidunt
                        nam deleniti! Sapiente quaerat officia quae dolorum, corporis, deleniti accusamus, placeat in
                        consequatur nemo expedita saepe. Minus molestias enim omnis maxime libero nemo culpa sapiente
                        modi officiis corporis neque quo atque ab rerum minima alias rem cupiditate veritatis aliquam,
                        ipsam assumenda repudiandae dolorum hic. Aperiam natus asperiores dolor ad eos porro perferendis
                        sint quia cumque ipsa quod veniam, rerum aspernatur? Placeat ipsa inventore repudiandae eligendi
                        quae labore reprehenderit soluta ratione et laborum qui corporis ullam esse eum ea nihil vitae
                        animi beatae suscipit minus nobis aliquam, magnam obcaecati numquam? Officiis magni cupiditate
                        sed, laudantium distinctio beatae provident accusamus tenetur quaerat corporis voluptatibus,
                        maiores, nam libero modi rerum error? Labore ullam numquam ut obcaecati natus facilis! Nisi est
                        voluptatum in laboriosam sequi illo sint, earum nihil possimus quas eius voluptates minima, quis
                        nemo ex temporibus odio libero soluta rerum a ad. Velit sint molestias aliquam illum enim, quasi
                        beatae adipisci, iusto modi optio suscipit vero sapiente debitis officia nulla excepturi minus
                        ipsum fugiat amet repudiandae. Placeat neque molestias reiciendis, ex consequatur vitae culpa
                        temporibus assumenda sunt illo minima sapiente dicta minus molestiae hic iste obcaecati adipisci
                        sint quae totam delectus optio itaque odio. Doloremque accusamus quam provident, soluta
                        voluptatum exercitationem labore repudiandae nisi perferendis voluptas. Amet enim ratione,
                        sapiente iure nobis ex a ipsa delectus, animi magni deleniti quae laudantium, quos eum obcaecati
                        numquam tempore harum eligendi! Repellendus odio eaque qui quas saepe explicabo commodi, quaerat
                        eum iure voluptatum ipsam in suscipit, voluptas dolore esse quos animi molestias nisi. Vitae,
                        vero? Ut saepe fugiat placeat nulla adipisci, deserunt unde culpa expedita debitis deleniti
                        recusandae repellendus doloribus, repudiandae enim rerum nisi eius, modi quo fuga excepturi
                        nostrum omnis. Voluptas aspernatur esse vel, dicta ullam molestiae architecto voluptatum ab
                        minima maiores distinctio, minus ea consectetur, voluptatem numquam nobis expedita consequatur
                        dolores? Aspernatur ipsam laboriosam tempora debitis dolor. Aliquam cumque, hic tempore
                        necessitatibus et esse consequuntur cupiditate, quasi explicabo itaque amet odit atque possimus
                        laudantium maxime, ex similique corrupti quaerat mollitia quibusdam est! Ex nemo laborum qui quo
                        beatae esse consequatur consequuntur, doloribus facilis error enim quaerat reprehenderit
                        nesciunt quos laboriosam alias ab rerum temporibus sed, similique doloremque veritatis
                        repudiandae corporis? Quasi molestiae explicabo earum, aperiam dolorum tempora itaque voluptas
                        eius optio, minus aspernatur. Accusantium voluptatum obcaecati saepe repudiandae doloribus
                        aperiam. Voluptatibus pariatur maxime nam, est ex officiis modi accusantium ratione iusto natus
                        distinctio dolor illum recusandae laboriosam libero quod, excepturi, minus eaque quidem!
                        Laudantium, laborum. Distinctio temporibus inventore alias optio libero ipsam ad provident
                        cumque laborum omnis vitae excepturi molestiae quibusdam, voluptatum iure consequuntur
                        laboriosam. Quaerat nulla assumenda nostrum neque facere.
                    </Text>
                    {/* Section spécifique à laquelle vous voulez faire défiler l'utilisateur */}
                    <View ref={sectionRef} style={{height: 500, backgroundColor: 'red', marginBottom: 20}} />
                    {/* Autres sections de la page */}
                    <View style={{height: 1000}}>
                        <Text>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut amet voluptatibus cumque illo
                            velit dolor cupiditate recusandae, consequatur dolorum odio ipsa perferendis placeat minus
                            nisi. Explicabo ex vel, incidunt, harum, necessitatibus ipsum ut error esse accusantium
                            consectetur natus architecto minus? Rem porro ducimus blanditiis distinctio molestiae vel
                            modi doloribus, harum corrupti minus maxime aperiam. Nulla debitis saepe consectetur beatae
                            voluptatibus laboriosam, repudiandae, nemo aspernatur atque non quaerat eos veritatis ipsam
                            numquam incidunt nam deleniti! Sapiente quaerat officia quae dolorum, corporis, deleniti
                            accusamus, placeat in consequatur nemo expedita saepe. Minus molestias enim omnis maxime
                            libero nemo culpa sapiente modi officiis corporis neque quo atque ab rerum minima alias rem
                            cupiditate veritatis aliquam, ipsam assumenda repudiandae dolorum hic. Aperiam natus
                            asperiores dolor ad eos porro perferendis sint quia cumque ipsa quod veniam, rerum
                            aspernatur? Placeat ipsa inventore repudiandae eligendi quae labore reprehenderit soluta
                            ratione et laborum qui corporis ullam esse eum ea nihil vitae animi beatae suscipit minus
                            nobis aliquam, magnam obcaecati numquam? Officiis magni cupiditate sed, laudantium
                            distinctio beatae provident accusamus tenetur quaerat corporis voluptatibus, maiores, nam
                            libero modi rerum error? Labore ullam numquam ut obcaecati natus facilis! Nisi est
                            voluptatum in laboriosam sequi illo sint, earum nihil possimus quas eius voluptates minima,
                            quis nemo ex temporibus odio libero soluta rerum a ad. Velit sint molestias aliquam illum
                            enim, quasi beatae adipisci, iusto modi optio suscipit vero sapiente debitis officia nulla
                            excepturi minus ipsum fugiat amet repudiandae. Placeat neque molestias reiciendis, ex
                            consequatur vitae culpa temporibus assumenda sunt illo minima sapiente dicta minus molestiae
                            hic iste obcaecati adipisci sint quae totam delectus optio itaque odio. Doloremque accusamus
                            quam provident, soluta voluptatum exercitationem labore repudiandae nisi perferendis
                            voluptas. Amet enim ratione, sapiente iure nobis ex a ipsa delectus, animi magni deleniti
                            quae laudantium, quos eum obcaecati numquam tempore harum eligendi! Repellendus odio eaque
                            qui quas saepe explicabo commodi, quaerat eum iure voluptatum ipsam in suscipit, voluptas
                            dolore esse quos animi molestias nisi. Vitae, vero? Ut saepe fugiat placeat nulla adipisci,
                            deserunt unde culpa expedita debitis deleniti recusandae repellendus doloribus, repudiandae
                            enim rerum nisi eius, modi quo fuga excepturi nostrum omnis. Voluptas aspernatur esse vel,
                            dicta ullam molestiae architecto voluptatum ab minima maiores distinctio, minus ea
                            consectetur, voluptatem numquam nobis expedita consequatur dolores? Aspernatur ipsam
                            laboriosam tempora debitis dolor. Aliquam cumque, hic tempore necessitatibus et esse
                            consequuntur cupiditate, quasi explicabo itaque amet odit atque possimus laudantium maxime,
                            ex similique corrupti quaerat mollitia quibusdam est! Ex nemo laborum qui quo beatae esse
                            consequatur consequuntur, doloribus facilis error enim quaerat reprehenderit nesciunt quos
                            laboriosam alias ab rerum temporibus sed, similique doloremque veritatis repudiandae
                            corporis? Quasi molestiae explicabo earum, aperiam dolorum tempora itaque voluptas eius
                            optio, minus aspernatur. Accusantium voluptatum obcaecati saepe repudiandae doloribus
                            aperiam. Voluptatibus pariatur maxime nam, est ex officiis modi accusantium ratione iusto
                            natus distinctio dolor illum recusandae laboriosam libero quod, excepturi, minus eaque
                            quidem! Laudantium, laborum. Distinctio temporibus inventore alias optio libero ipsam ad
                            provident cumque laborum omnis vitae excepturi molestiae quibusdam, voluptatum iure
                            consequuntur laboriosam. Quaerat nulla assumenda nostrum neque facere.
                        </Text>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity
                onPress={scrollToSection}
                style={{alignItems: 'center', padding: 10, backgroundColor: 'blue'}}>
                <Text style={{color: 'white'}}>Défiler vers l'ancre</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Test;
