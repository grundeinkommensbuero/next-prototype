import React, { useState, useEffect, useContext, ReactElement } from 'react';
import { Form, Field } from 'react-final-form';

import AuthContext from '../../../context/Authentication';
import { useAnswerChallenge, useSignIn } from '../../../hooks/Authentication';

import FormSection from '../../Forms/FormSection';
import FormWrapper from '../../Forms/FormWrapper';
import { FinallyMessage } from '../../Forms/FinallyMessage';
import { TextInputWrapped } from '../../Forms/TextInput';
import { InlineButton } from '../../Forms/Button';
import { CTAButtonContainer, CTAButton } from '../../Forms/CTAButton';
import s from '../style.module.scss';
import { OnboardingModalContext } from '../../../context/OnboardingModal';
import { useRouter } from 'next/router';
import { ColorScheme } from '../../Section';

type EnterLoginCodeProps = {
  children?: ReactElement | ReactElement[] | string;
  preventSignIn?: boolean;
  buttonText?: string;
  onAnswerChallengeSuccess?: () => void;
  colorScheme?: ColorScheme;
  wrongCodeMessage?: ReactElement | string;
};

export const EnterLoginCode = ({
  children,
  preventSignIn,
  buttonText,
  onAnswerChallengeSuccess,
  colorScheme,
  wrongCodeMessage,
}: EnterLoginCodeProps) => {
  const { setShowModal } = useContext(OnboardingModalContext);

  const { tempEmail, setTempEmail, isAuthenticated } = useContext(AuthContext);
  const [answerChallengeState, setCode, setAnswerChallengeState] =
    useAnswerChallenge();
  const [signInState, startSignIn] = useSignIn();
  const [triggerMinuteTimer, setTriggerOneMinuteTimer] = useState(0);
  const [timerCounter, setTimerCounter] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // We don't want to start sign in again, if flag is set
    // (we might already have started sign in outside of component)
    if (!preventSignIn) {
      startSignIn();
    }
  }, []);

  useEffect(() => {
    if (answerChallengeState === 'success' && isAuthenticated) {
      if (onAnswerChallengeSuccess) {
        onAnswerChallengeSuccess();
      }
    } else if (answerChallengeState === 'restartSignIn') {
      // We want to send a new code by starting sign in again
      startSignIn();
    }
  }, [answerChallengeState, isAuthenticated]);

  useEffect(() => {
    countdown();
  }, [triggerMinuteTimer]);

  const countdown = () => {
    let seconds = 60;
    function tick() {
      seconds--;
      setTimerCounter(seconds);
      if (seconds > 0) {
        setTimeout(tick, 1000);
      }
    }
    tick();
  };

  if (answerChallengeState === 'loading' || signInState === 'loading') {
    return (
      <FinallyMessage colorScheme={colorScheme} loading>
        Einen Moment bitte...
      </FinallyMessage>
    );
  }

  if (answerChallengeState === 'success') {
    return (
      <FinallyMessage colorScheme={colorScheme}>
        Erfolgreich identifiziert.
      </FinallyMessage>
    );
  }

  if (signInState === 'userNotFound') {
    return (
      <FinallyMessage colorScheme={colorScheme}>
        <p>
          Oh! Es scheint, diese Email-Addresse ist noch nicht bei uns
          registriert.{' '}
          <InlineButton
            aria-label="Registrieren"
            onClick={() => setShowModal(true)}
          >
            Hier kannst du dich neu registrieren.
          </InlineButton>
        </p>

        <p>Oder hast du deine Email-Adresse falsch eingegeben?</p>

        <CTAButtonContainer>
          <CTAButton
            onClick={() => {
              setTempEmail && setTempEmail('');
            }}
          >
            Nochmal versuchen
          </CTAButton>
        </CTAButtonContainer>
      </FinallyMessage>
    );
  }

  return (
    <FinallyMessage colorScheme={colorScheme}>
      <>
        {answerChallengeState === 'wrongCode' &&
          (wrongCodeMessage || (
            <p>
              Der eingegebene Code ist falsch oder bereits abgelaufen. Bitte
              ??berpr??fe die Email erneut oder fordere unten einen neuen Code an.
            </p>
          ))}

        {(answerChallengeState === 'resentCode' ||
          answerChallengeState === 'restartSignIn') && (
          <p>
            Der Code wurde erneut per E-Mail{' '}
            {tempEmail ? ` (${tempEmail})` : ''} geschickt.
          </p>
        )}

        {!answerChallengeState && (
          <>
            {children ? (
              children
            ) : (
              <>
                <h3 className={s.headingWhite}>Sch??n, dass du an Bord bist.</h3>
                <p>
                  Um dich zu identifizieren, haben wir dir einen Code per E-Mail
                  {tempEmail ? ` (${tempEmail})` : ''} geschickt.
                  <br />
                  <b>Dein Code ist 20 Minuten lang g??ltig. </b>
                </p>
              </>
            )}{' '}
          </>
        )}
        <Form
          onSubmit={e => {
            setCode(e.code);
          }}
          validate={values => {
            if (!values.code)
              return { code: 'Bitte gib den Code aus der E-Mail an' };
            return {};
          }}
          render={({ handleSubmit }) => {
            return (
              <FormWrapper>
                <form onSubmit={handleSubmit}>
                  <FormSection className={s.loginForm}>
                    <Field
                      name="code"
                      label="Geheimer Code"
                      placeholder="Geheimer Code"
                      type="text"
                      autoComplete="off"
                      component={TextInputWrapped as any}
                    ></Field>
                  </FormSection>

                  <CTAButtonContainer className={s.buttonContainer}>
                    <CTAButton type="submit">
                      {buttonText ? buttonText : 'Abschicken'}
                    </CTAButton>
                    {timerCounter === 0 ? (
                      <InlineButton
                        type="button"
                        onClick={() => {
                          setAnswerChallengeState(undefined);
                          setCode('resendCode');
                          setTriggerOneMinuteTimer(triggerMinuteTimer + 1);
                        }}
                      >
                        Code erneut senden
                      </InlineButton>
                    ) : (
                      <div className={s.counterDescriptionContainer}>
                        <p className={s.counterDescription}>
                          Wenn du den Code nicht erhalten hast, kannst du in{' '}
                          {timerCounter}{' '}
                          {timerCounter !== 1 ? 'Sekunden' : 'Sekunde'} den Code
                          erneut anfordern.
                        </p>
                      </div>
                    )}
                  </CTAButtonContainer>
                </form>
              </FormWrapper>
            );
          }}
        />
      </>
    </FinallyMessage>
  );
};
