import type { Metadata } from 'next'
import Link from 'next/link'
import { identity } from '@/data/identity'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité du site lesjardinsdhenri.fr',
}

export default function ConfidentialitePage() {
  return (
    <>
      <nav aria-label="Fil d'Ariane" style={{ paddingTop: '1.5rem', paddingBottom: '0.5rem' }}>
        <div className="container">
          <ol style={{ display: 'flex', gap: '0.5rem', listStyle: 'none', margin: 0, padding: 0, fontSize: '0.8125rem', color: 'var(--color-text)', opacity: 0.65 }}>
            <li><Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Accueil</Link></li>
            <li aria-hidden="true">›</li>
            <li aria-current="page">Politique de confidentialité</li>
          </ol>
        </div>
      </nav>

      <section style={{ paddingBlock: 'var(--section-gap)' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <h1 className="section-title" style={{ marginBottom: '2rem' }}>
            Politique de confidentialité
          </h1>

          <div className="prose" style={{ lineHeight: 1.75 }}>
            <div style={{ padding: '1rem', background: 'rgba(183,118,80,0.12)', borderLeft: '3px solid var(--color-terracotta)', borderRadius: '4px', marginBottom: '2rem', fontSize: '0.875rem' }}>
              <strong>Note de démonstration</strong> — Ce gabarit décrit les traitements prévus.
              Il doit être relu et validé par le responsable de traitement avant mise en production.
              En version démo, aucune donnée personnelle n&apos;est conservée ni transmise.
            </div>

            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-green)', marginBottom: '0.75rem', marginTop: '1.75rem' }}>
              Responsable de traitement
            </h2>
            <p>
              {identity.legalName}<br />
              {identity.headquarters.lines.join(', ')}<br />
              Contact : <a href={`mailto:${identity.email}`} style={{ color: 'var(--color-green)' }}>{identity.email}</a>
            </p>

            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-green)', marginBottom: '0.75rem', marginTop: '1.75rem' }}>
              Données collectées
            </h2>
            <p>
              Ce site collecte des données personnelles uniquement lors de l&apos;envoi des formulaires
              de contact et de demande de devis. Ces données sont :
            </p>
            <ul>
              <li>Nom et prénom</li>
              <li>Téléphone ou adresse e-mail selon le choix effectué</li>
              <li>Commune du chantier</li>
              <li>Message facultatif</li>
            </ul>

            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-green)', marginBottom: '0.75rem', marginTop: '1.75rem' }}>
              Finalité et base légale
            </h2>
            <p>
              Ces données sont collectées sur la base de votre consentement, exprimé par l&apos;envoi
              du formulaire, dans le seul but de traiter votre demande de contact ou de devis.
              Elles ne sont pas utilisées à des fins de prospection commerciale sans votre accord préalable.
            </p>

            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-green)', marginBottom: '0.75rem', marginTop: '1.75rem' }}>
              Destinataires
            </h2>
            <p>
              Les données sont transmises uniquement à {identity.legalName}
              pour le traitement de votre demande.
              Elles ne sont pas revendues ni transmises à des tiers.
            </p>

            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-green)', marginBottom: '0.75rem', marginTop: '1.75rem' }}>
              Durée de conservation
            </h2>
            <p style={{ fontStyle: 'italic', opacity: 0.7 }}>
              Durée de conservation à préciser avant mise en production.
            </p>

            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-green)', marginBottom: '0.75rem', marginTop: '1.75rem' }}>
              Vos droits
            </h2>
            <p>
              Conformément au Règlement général sur la protection des données (RGPD),
              vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement,
              de limitation et d&apos;opposition au traitement de vos données.
              Pour exercer ces droits, contactez-nous à l&apos;adresse :{' '}
              <a href={`mailto:${identity.email}`} style={{ color: 'var(--color-green)' }}>{identity.email}</a>.
            </p>
            <p>
              Vous disposez également du droit d&apos;introduire une réclamation auprès de
              la <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-green)' }}>CNIL</a>.
            </p>

            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-green)', marginBottom: '0.75rem', marginTop: '1.75rem' }}>
              Cookies et traceurs
            </h2>
            <p>
              Ce site ne dépose aucun cookie publicitaire, aucun traceur de mesure d&apos;audience
              ni aucun pixel de réseau social. Les polices de caractères et les images sont
              servies localement. Aucun bandeau de consentement aux cookies n&apos;est affiché
              en l&apos;absence de ces traceurs.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
