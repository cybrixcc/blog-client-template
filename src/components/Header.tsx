// TODO: Implement site header
// Should include: logo/site name, navigation links, CTA button
// Brand colors and style should match the client's website design
//
// Props to support:
//   none required — reads site config from environment or hardcoded values
//
// Example structure:
//   <header>
//     <nav>
//       <Logo />
//       <NavLinks />
//       <CTAButton href={CTA_URL}>Get Started</CTAButton>
//     </nav>
//   </header>

export function Header() {
  return (
    <header>
      <nav>
        <span>My Blog</span>
      </nav>
    </header>
  );
}
