import { useState, type FormEvent } from 'react';
import { Heart, MessageCircle, Send } from 'lucide-react';
import { getWhatsAppUrl } from '../lib/date';
import type { BirthdayConfig, RSVPValues } from '../types';
import SectionReveal from './SectionReveal';

type RSVPProps = { config: BirthdayConfig };
type RSVPErrors = Partial<Record<keyof RSVPValues, string>>;
const initialValues: RSVPValues = { fullName: '', phone: '', guests: 1, attendance: '' };

export default function RSVP({ config }: RSVPProps) {
  const [values, setValues] = useState<RSVPValues>(initialValues);
  const [errors, setErrors] = useState<RSVPErrors>({});
  const [confirmation, setConfirmation] = useState('');

  const update = <Key extends keyof RSVPValues>(key: Key, value: RSVPValues[Key]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setConfirmation('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: RSVPErrors = {};
    if (!values.fullName.trim()) nextErrors.fullName = 'Please add your name.';
    if (values.phone.replace(/\D/g, '').length < 7) nextErrors.phone = 'Please enter a valid phone number.';
    if (values.guests < 1 || values.guests > 12) nextErrors.guests = 'Choose between 1 and 12 guests.';
    if (!values.attendance) nextErrors.attendance = 'Please let us know if you can make it.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setConfirmation(
      values.attendance === 'yes'
        ? `Thank you, ${values.fullName.trim()} — we can’t wait to celebrate together.`
        : `Thank you for letting us know, ${values.fullName.trim()}. You’ll be there in spirit.`,
    );
  };

  const whatsappMessage = `Hello! I'd like to RSVP for ${config.birthdayGirl}'s birthday celebration on ${config.displayDate}. My name is ${values.fullName.trim() || '[YOUR NAME]'}; ${values.attendance === 'no' ? 'I am unable to attend' : `I would like to attend with ${values.guests} guest${values.guests === 1 ? '' : 's'}`}.`;
  const whatsappUrl = getWhatsAppUrl(config.whatsappNumber, whatsappMessage);

  return (
    <section id="rsvp" className="rsvp-section" aria-labelledby="rsvp-title">
      <div className="section-width rsvp-layout">
        <SectionReveal className="rsvp-intro">
          <p className="rsvp-overline">An evening is only as lovely as its company</p>
          <h2 className="section-title" id="rsvp-title">Will You Celebrate<br /><em>With Us?</em></h2>
          <p>Your presence will make the celebration even more special.</p>
          <Heart className="rsvp-heart" size={19} strokeWidth={1.25} aria-hidden="true" />
        </SectionReveal>

        <SectionReveal className="rsvp-form-wrap">
          <form className="rsvp-form" onSubmit={handleSubmit} noValidate>
            <label className="form-field">
              <span>Full Name</span>
              <input
                autoComplete="name"
                name="fullName"
                type="text"
                value={values.fullName}
                onChange={(event) => update('fullName', event.target.value)}
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? 'rsvp-name-error' : undefined}
                required
              />
              {errors.fullName && <small className="field-error" id="rsvp-name-error">{errors.fullName}</small>}
            </label>
            <label className="form-field">
              <span>Phone Number</span>
              <input
                autoComplete="tel"
                name="phone"
                type="tel"
                inputMode="tel"
                value={values.phone}
                onChange={(event) => update('phone', event.target.value)}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'rsvp-phone-error' : undefined}
                required
              />
              {errors.phone && <small className="field-error" id="rsvp-phone-error">{errors.phone}</small>}
            </label>
            <label className="form-field">
              <span>Number of Guests</span>
              <select
                name="guests"
                value={values.guests}
                onChange={(event) => update('guests', Number(event.target.value))}
                aria-invalid={Boolean(errors.guests)}
                aria-describedby={errors.guests ? 'rsvp-guests-error' : undefined}
              >
                {Array.from({ length: 12 }, (_, index) => index + 1).map((amount) => (
                  <option key={amount} value={amount}>{amount} {amount === 1 ? 'guest' : 'guests'}</option>
                ))}
              </select>
              {errors.guests && <small className="field-error" id="rsvp-guests-error">{errors.guests}</small>}
            </label>
            <fieldset
              className="attendance-fieldset"
              aria-invalid={Boolean(errors.attendance)}
              aria-describedby={errors.attendance ? 'rsvp-attendance-error' : undefined}
            >
              <legend>Will you be joining us?</legend>
              <label className={`attendance-option ${values.attendance === 'yes' ? 'is-selected' : ''}`}>
                <input type="radio" name="attendance" value="yes" checked={values.attendance === 'yes'} onChange={() => update('attendance', 'yes')} />
                <span>Yes, I’ll be there</span><Heart size={14} strokeWidth={1.4} aria-hidden="true" />
              </label>
              <label className={`attendance-option ${values.attendance === 'no' ? 'is-selected' : ''}`}>
                <input type="radio" name="attendance" value="no" checked={values.attendance === 'no'} onChange={() => update('attendance', 'no')} />
                <span>Sorry, I can’t make it</span>
              </label>
              {errors.attendance && <small className="field-error" id="rsvp-attendance-error" role="alert">{errors.attendance}</small>}
            </fieldset>
            {Object.keys(errors).length > 0 && <p className="form-summary-error" role="alert">Please review the details above.</p>}
            {confirmation && <p className="form-confirmation" role="status">{confirmation}</p>}
            <button className="button button--burgundy rsvp-submit" type="submit">
              Confirm RSVP <Send size={14} strokeWidth={1.5} aria-hidden="true" />
            </button>
            {whatsappUrl && (
              <a className="whatsapp-link" href={whatsappUrl} target="_blank" rel="noreferrer noopener">
                <MessageCircle size={16} strokeWidth={1.4} aria-hidden="true" />
                Or RSVP through WhatsApp
              </a>
            )}
          </form>
        </SectionReveal>
      </div>
    </section>
  );
}
