import { useState } from 'react';

export default function Contact() {
  const [agreed, setAgreed] = useState(false);

  return (
    <div style={{ position: 'relative', padding: '6rem 0', backgroundColor: 'white' }}>
      <div style={{ margin: '0 auto', maxWidth: '40rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827' }}>Contact sales</h2>
        <p style={{ marginTop: '0.5rem', fontSize: '1.125rem', lineHeight: '1.75rem', color: '#6B7280' }}>
          Aute magna irure deserunt veniam aliqua magna enim voluptate.
        </p>
      </div>
      <form action="#" method="POST" style={{ margin: '4rem auto 0', maxWidth: '32rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
          <div>
            <label htmlFor="first-name" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#111827' }}>
              First name
            </label>
            <div style={{ marginTop: '0.625rem' }}>
              <input
                id="first-name"
                name="first-name"
                type="text"
                autoComplete="given-name"
                style={{
                  display: 'block',
                  width: '100%',
                  borderRadius: '0.375rem',
                  padding: '0.625rem 0.875rem',
                  color: '#111827',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  border: '1px solid #E5E7EB',
                  placeholder: { color: '#9CA3AF' },
                  focus: { outline: '2px solid #4F46E5' },
                  fontSize: '0.875rem',
                  lineHeight: '1.25rem',
                }}
              />
            </div>
          </div>
          <div>
            <label htmlFor="last-name" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#111827' }}>
              Last name
            </label>
            <div style={{ marginTop: '0.625rem' }}>
              <input
                id="last-name"
                name="last-name"
                type="text"
                autoComplete="family-name"
                style={{
                  display: 'block',
                  width: '100%',
                  borderRadius: '0.375rem',
                  padding: '0.625rem 0.875rem',
                  color: '#111827',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  border: '1px solid #E5E7EB',
                  placeholder: { color: '#9CA3AF' },
                  focus: { outline: '2px solid #4F46E5' },
                  fontSize: '0.875rem',
                  lineHeight: '1.25rem',
                }}
              />
            </div>
          </div>
          <div>
            <label htmlFor="company" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#111827' }}>
              Company
            </label>
            <div style={{ marginTop: '0.625rem' }}>
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                style={{
                  display: 'block',
                  width: '100%',
                  borderRadius: '0.375rem',
                  padding: '0.625rem 0.875rem',
                  color: '#111827',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  border: '1px solid #E5E7EB',
                  placeholder: { color: '#9CA3AF' },
                  focus: { outline: '2px solid #4F46E5' },
                  fontSize: '0.875rem',
                  lineHeight: '1.25rem',
                }}
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#111827' }}>
              Email
            </label>
            <div style={{ marginTop: '0.625rem' }}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                style={{
                  display: 'block',
                  width: '100%',
                  borderRadius: '0.375rem',
                  padding: '0.625rem 0.875rem',
                  color: '#111827',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  border: '1px solid #E5E7EB',
                  placeholder: { color: '#9CA3AF' },
                  focus: { outline: '2px solid #4F46E5' },
                  fontSize: '0.875rem',
                  lineHeight: '1.25rem',
                }}
              />
            </div>
          </div>
          <div>
            <label htmlFor="phone-number" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#111827' }}>
              Phone number
            </label>
            <div style={{ marginTop: '0.625rem' }}>
              <input
                id="phone-number"
                name="phone-number"
                type="tel"
                autoComplete="tel"
                style={{
                  display: 'block',
                  width: '100%',
                  borderRadius: '0.375rem',
                  padding: '0.625rem 0.875rem',
                  color: '#111827',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  border: '1px solid #E5E7EB',
                  placeholder: { color: '#9CA3AF' },
                  focus: { outline: '2px solid #4F46E5' },
                  fontSize: '0.875rem',
                  lineHeight: '1.25rem',
                }}
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#111827' }}>
              Message
            </label>
            <div style={{ marginTop: '0.625rem' }}>
              <textarea
                id="message"
                name="message"
                rows={4}
                style={{
                  display: 'block',
                  width: '100%',
                  borderRadius: '0.375rem',
                  padding: '0.625rem 0.875rem',
                  color: '#111827',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  border: '1px solid #E5E7EB',
                  placeholder: { color: '#9CA3AF' },
                  focus: { outline: '2px solid #4F46E5' },
                  fontSize: '0.875rem',
                  lineHeight: '1.25rem',
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
                style={{
                  width: '1rem',
                  height: '1rem',
                  borderRadius: '0.25rem',
                  backgroundColor: agreed ? '#4F46E5' : '#E5E7EB',
                  border: '1px solid #E5E7EB',
                  marginRight: '0.5rem',
                }}
              />
            </div>
            <label style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#6B7280' }}>
              By selecting this, you agree to our{' '}
              <a href="#" style={{ fontWeight: '600', color: '#4F46E5' }}>
                privacy&nbsp;policy
              </a>
              .
            </label>
          </div>
        </div>
        <div style={{ marginTop: '2.5rem' }}>
          <button
            type="submit"
            style={{
              display: 'block',
              width: '100%',
              borderRadius: '0.375rem',
              backgroundColor: '#4F46E5',
              padding: '0.625rem 0.875rem',
              textAlign: 'center',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: 'white',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            }}
          >
            Let's talk
          </button>
        </div>
      </form>
    </div>
  );
}
