# Translation Implementation Guide

## ✅ Completed

1. **Translation Files Created**
   - `/translations/index.ts` - Complete translations for CS, EN, DE, SK
   - All pages covered: Home, About, Services, Contact, Activities, Gallery, Footer, Nav

2. **Language Context Setup**
   - `/context/LanguageContext.tsx` - Provides language state and translations
   - Wrapped app in `_app.tsx` with LanguageProvider

3. **Navbar Updated**
   - Uses `useLanguage()` hook
   - Dynamic nav items based on selected language
   - Language switcher synced with context

## 🔄 Components That Need Translation Updates

To complete the translation implementation, update these components to use `useLanguage()` hook:

### How to Update Components:

```typescript
import { useLanguage } from "@/context/LanguageContext";

export default function ComponentName() {
  const { t } = useLanguage();

  // Use translations like:
  // t.home.hero
  // t.about.title
  // t.footer.description
  // etc.
}
```

### Components to Update:

1. **Footer** (`/components/Footer.tsx`)
   - Replace hardcoded Czech text with `t.footer.*`

2. **MobileNav** (`/components/MobileNav.tsx`)
   - Update language switcher to use context
   - Update nav items to use `t.nav.*`

3. **Home Page Components** (`/container/home-page/`)
   - `Hero.tsx` - Use `t.home.hero`, `t.home.heroSub`, `t.home.heroDesc`
   - `About.tsx` - Use `t.home.aboutTitle`, `t.home.aboutText1`, `t.home.aboutText2`
   - `Projects.tsx` - Use `t.home.projectsTitle`
   - `Clients.tsx` - Use `t.home.clientsTitle`

4. **About Page Components** (`/container/about-page/`)
   - `Hero.tsx` - Use `t.about.*`
   - `About.tsx` - Use `t.about.whatWeOffer`, etc.

5. **Services Page** (`/container/services-page/Hero.tsx`)
   - Use `t.services.*`

6. **Contact Page** (`/container/contact-page/`)
   - `Hero.tsx` - Use `t.contact.title`, `t.contact.subtitle`
   - `Form.tsx` - Use all `t.contact.*` fields

7. **Insights Page** (`/container/insights-page/Hero.tsx`)
   - Use `t.activities.*`

8. **Presentation Page** (`/container/presentation-page/Hero.tsx`)
   - Use `t.gallery.title`

## Example Implementation for Footer:

```typescript
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full z-30 relative bg-[#0a0a0a] text-white">
      <div className="w-full padding-x padding-y">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          <div className="lg:col-span-1">
            <Link href={"/"}>
              <Image src={logo} alt="Vila Adalbert logo" width={80} height={80} className="mb-6" />
            </Link>
            <p className="text-sm text-white/60 leading-relaxed">
              {t.footer.description}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-white">
              {t.footer.navigation}
            </h3>
            {/* Nav items here */}
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-white">
              {t.footer.contact}
            </h3>
            <p className="text-sm text-white/70">{t.footer.address}</p>
            <p className="text-sm text-white/70">{t.footer.addressLine1}</p>
            {/* etc */}
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/50">{t.footer.copyright}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-white/50 hover:text-white transition-colors">
              {t.footer.privacy}
            </Link>
            <Link href="/terms" className="text-sm text-white/50 hover:text-white transition-colors">
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

## Testing

After updating all components:
1. Change language in navbar dropdown
2. Verify all text on every page updates accordingly
3. Test all 4 languages (CS, EN, DE, SK)
4. Check mobile navigation language switcher

## Notes

- All translation keys are already defined in `/translations/index.ts`
- The context automatically provides the correct translation based on selected language
- Language persists across page navigation
- Default language is Czech (CS)
