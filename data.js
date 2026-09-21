/* Linux kernel timeline content — 65 milestones across 8 eras.
   Each entry: date, kind (release|event), summary (card blurb), facts (highlights), more (further-reading paragraphs), links. */
window.__ERAS__ = [
  { id: 'origins',    name: 'Origins',            tagline: 'One hacker, one 386',      y0: 1991.4, y1: 1993.5, color: '#2e7d4f' },
  { id: 'distros',    name: 'The Distribution Era', tagline: 'Linux gets a package',   y0: 1993.5, y1: 1996.5, color: '#b3831a' },
  { id: 'scaling',    name: 'Scaling Up',         tagline: 'Servers and startups',     y0: 1996.5, y1: 1999.5, color: '#2f6bb0' },
  { id: 'enterprise', name: 'Going Enterprise',   tagline: 'Big iron embraces the penguin', y0: 1999.5, y1: 2003.5, color: '#b04a2f' },
  { id: 'modern',     name: 'The Modern Kernel',  tagline: '2.6 changes everything',   y0: 2003.5, y1: 2008.5, color: '#7a4dbf' },
  { id: 'takeover',   name: 'Mainstream Takeover', tagline: 'Phones, clouds, classrooms', y0: 2008.5, y1: 2013.0, color: '#158a8a' },
  { id: 'everywhere', name: 'Everywhere',         tagline: 'From Docker to deep space', y0: 2013.0, y1: 2019.0, color: '#4356b8' },
  { id: 'frontier',   name: 'The New Frontier',   tagline: 'Rust, real time, and beyond', y0: 2019.0, y1: 2027.2, color: '#c25e1e' },
];

window.__MILESTONES__ = [
  { date: '1991-08-25', era: 'origins', kind: 'event', title: '"Hello everybody out there…"', summary: 'Linus Torvalds posts his "hobby" project to comp.os.minix — not "big and professional like gnu".', facts: [
    'Posted to comp.os.minix on a 33 MHz 80386 he had bought on credit',
    '"Just a hobby, won\'t be big and professional like gnu"',
    'Four years earlier the GNU project had pledged a free OS — its kernel was still missing' ],
    more: [
      'On 25 August 1991, a 21-year-old computer science student at the University of Helsinki wrote a Usenet post that would quietly launch the largest collaborative software project in history. Linus Benedict Torvalds asked comp.os.minix readers what features they would most want to see in a free operating system he was building for the 80386 — "just a hobby, won\'t be big and professional like gnu" — and mentioned in passing that he was looking for feedback on POSIX compliance, "if anyone has any suggestions".',
      'The kernel had actually started as a terminal emulator: Linus wanted to dial into the university\'s AIX and Minix machines from home, and writing a program to control his new 386\'s serial port seemed like the natural way to learn the processor\'s protected mode. By August the emulator had grown task switching, a filesystem, and a shell — at which point it was, more or less, an operating system.',
      'The post is often misremembered as the birth announcement of Linux; in fact Linus had said the previous month that the system was "in the making" and had already begun hinting at a release. But the 25 August note is the moment the project acquired a public audience, and its self-deprecating tone — Linus later admitted the gnu comparison was deliberately provocative — made it legendary.',
      'The GNU system, whose kernel (GNU Hurd) would not reach usable form for years, supplied the compiler, the C library and almost everything around the kernel that actually made Linux a usable operating system. Linus\'s "hobby" filled the one slot the free-software ecosystem was missing.' ],
    links: [ ['The original post (collected archives)', 'https://en.wikipedia.org/wiki/History_of_Linux'], ['Linus Torvalds', 'https://en.wikipedia.org/wiki/Linus_Torvalds'], ['GNU Hurd — the kernel that wasn\'t ready', 'https://en.wikipedia.org/wiki/GNU_Hurd'] ] },

  { date: '1991-09-17', version: '0.01', era: 'origins', kind: 'release', title: 'The first kernel', summary: 'Linux 0.01 hits FTP: 10,239 lines of C and assembly that boot and do almost nothing else.', facts: [
    '10,239 lines of code — the 2026 kernel is over 40 million',
    'No networking, no floppy support, text mode only',
    'It depended on Minix to build and boot it' ],
    more: [
      'Linux 0.01 was uploaded on 17 September 1991 to ftp.funnet.fi — actually ftp.funet.fi, the Finnish University and Research Network FTP server — by Ari Lemmke, the sysadmin who was also responsible for the directory name. Linus had wanted to call his kernel "Freax" ("free" + "freak" + the x of Unix); Lemmke, unimpressed, simply created a folder named "linux".',
      'The tarball contained 88 files and 10,239 lines of code, and its README was disarmingly honest: Linux was intended for hackers, it would probably never support anything other than AT hard disks ("as that\'s all I have"), and the C code was full of 386-specific assumptions that "you will have to fix yourself if you port it to something else". It booted bash and gcc — because those were the only Minix binaries Linus had bothered to port — and little else.',
      'For a modern reader the most striking thing about 0.01 is what it lacks: no networking, no virtual memory beyond basic paging, no display driver to speak of, and no ability to mount its own root filesystem in a way we would recognise. It could barely run itself. The kernel\'s own README apologised for the non-portable assembly and suggested that anyone offended by the code style should write their own operating system.',
      'Within three weeks the follow-up 0.02 release invited the world to try it, and within four months the kernel could compile itself — the canonical test of a serious Unix-like system.' ],
    links: [ ['Linux kernel version history', 'https://en.wikipedia.org/wiki/Linux_kernel#History'], ['A guided tour of 0.01 (annotated)', 'https://github.com/zavg/linux-0.01'], ['ftp.funet.fi and the naming of Linux', 'https://en.wikipedia.org/wiki/History_of_Linux'] ] },

  { date: '1991-12-08', version: '0.11', era: 'origins', kind: 'release', title: 'The kernel compiles itself', summary: 'Linux 0.11 is self-hosting: it can build its own toolchain and run the compiler that builds it.', facts: [
    'First release compiled entirely with itself',
    'Added floppy drivers and multi-language keyboard maps',
    'Randy Dunlap\'s docs made 0.11 the classic "build it yourself" release' ],
    more: [
      'By December 1991 Linux had reached the milestone that separates a toy from an operating system: version 0.11, released on 8 December, could compile itself. With gcc ported to run under Linux, the kernel could be built, booted and rebuilt without Minix anywhere in the loop — the moment Linux stopped being a Minix accessory and became self-hosting.',
      'Version 0.11 was the first release practical enough for others to run daily. It gained working floppy drivers, proper partition support, and international keyboard maps; the accompanying mkfs, fsck and other userland utilities turned it from a demo into a system you could actually administer. Lars Wirzenius — Linus\'s friend from the university\'s "Niksula" computer lab — documented it, and the release notes set the tone for Linux documentation: plain, blunt, and correct.',
      'The 0.11 lineage survives in a curious way: because it is small enough to understand end-to-end, it is still used in operating-systems courses and has been ported, maintained and re-documented by hobbyists for decades. The 1992 book "Linux Kernel Hackers\' Guide" was written against it, and running 0.11 in an emulator remains a rite of passage.' ],
    links: [ ['Linux Kernel Hackers\' Guide (1992-era)', 'https://tldp.org/LDP/tlk/dd/ground.html'], ['Linux kernel history', 'https://en.wikipedia.org/wiki/History_of_Linux'] ] },

  { date: '1992-02-11', era: 'origins', kind: 'event', title: 'The Tanenbaum debate', summary: 'MINIX author Andy Tanenbaum calls Linux "obsolete" in a Usenet thread read around the world.', facts: [
    '"I would suggest that people who want to run a free OS use 386BSD"',
    'Linus\'s measured reply: Linux would have "died in 1992 if I had ears to listen"',
    'The debate aged well — monolithic Linux outlived GNU Hurd and MINIX' ],
    more: [
      'On 29 January 1992, Andrew S. Tanenbaum — professor, author of the MINIX teaching operating system, and Linus\'s accidental mentor-by-book ("Operating Systems: Design and Implementation" was how many first learned Unix internals) — posted a scathing critique titled "Linux is obsolete". His argument: the monolithic kernel was a 1970s dead end, and a modern OS should be a set of cooperating user-space servers (a microkernel), the design he had taught in MINIX.',
      'The thread that followed — 100+ posts over weeks — is one of the great documents of computing history. Linus argued that portability of the *source* mattered more than architecture purity, that performance and pragmatism beat theoretical elegance, and that he would never have started Linux had GNU Hurd been ready. Tanenbaum conceded the marketplace would decide; GNU\'s Richard Stallman and many future kernel hackers entered the conversation. The exchange is remembered for Linus\'s dry coda: "If AT&T had the rights to the ... I would suggest that people who want a **free** OS use 386BSD" was Tanenbaum\'s line; Linus\'s was that Linux would "have died in 1992 if I had been listening to the nay-sayers".',
      'History\'s verdict was lopsided. MINIX itself became important — Intel\'s Management Engine runs a MINIX 3 derivative — but as a mainstream OS it never left the classroom, while the "obsolete" monolithic kernel now runs the world. The episode also taught the young Linux community a durable lesson: argue on evidence, ship code, and outlast the critics.' ],
    links: [ ['The Tanenbaum–Torvalds debate (full thread)', 'https://en.wikipedia.org/wiki/Tanenbaum%E2%80%93Torvalds_debate'], ['MINIX', 'https://en.wikipedia.org/wiki/MINIX'], ['Microkernel vs monolithic, revisited', 'https://en.wikipedia.org/wiki/Microkernel'] ] },

  { date: '1992-03-15', version: '0.95', era: 'origins', kind: 'release', title: 'Windows arrive', summary: 'The X Window System is ported to Linux and the kernel is renumbered 0.95 as 1.0 looms.', facts: [
    'Orest Zborowski ported X11 — a real GUI on a hobby kernel',
    'Version jumped 0.13 → 0.95 to signal the 1.0 home stretch',
    'First TCP/IP experiments appear in the tree' ],
    more: [
      'In March 1992 two events quietly transformed Linux\'s trajectory. Orest Zborowski ported the X Window System to Linux, giving the hobby kernel a real graphical environment — windows, terminals, the works — and the version number jumped from 0.13 to 0.95, a not-so-subtle signal that Linus considered 1.0 within reach. Network experiments based on Fred van Kempen\'s "net-2" TCP/IP code began landing in parallel.',
      'Running X11 mattered more than it sounds. It meant Linux could run the same desktop software as the commercial Unix workstations of the day, on a machine that cost a few thousand dollars. It also forced the kernel to grow up: shared libraries, better memory management and real device abstractions all followed from the demands of X.',
      'The 0.95 numbering also marked a social change: with 1.0 in sight, the project transitioned from Linus\'s personal project to something closer to an organized community, complete with a nascent kernel mailing list, contributors writing drivers for hardware Linus did not own, and the first arguments about what belonged in the kernel at all.' ],
    links: [ ['X Window System', 'https://en.wikipedia.org/wiki/X_Window_System'], ['Linux 0.9x era', 'https://en.wikipedia.org/wiki/History_of_Linux'] ] },

  { date: '1993-07-16', era: 'distros', kind: 'event', title: 'Slackware launches', summary: 'Patrick Volkerding ships Slackware — the oldest maintained Linux distribution, still updated today.', facts: [
    'Distributed on floppy disks; 32 of them for a full install',
    'Made Linux installable by ordinary mortals',
    'Volkerding still maintains Slackware 30+ years later' ],
    more: [
      'Before 1993, installing Linux meant assembling a filesystem by hand from FTP directories. Peter MacDonald\'s Softlanding Linux System (SLS) bundled everything but was buggy and badly maintained — so Patrick Volkerding, then a student at Minnesota State, fixed SLS\'s defects and shipped the result as "Slackware" in July 1993. The name was a play on the Church of the SubGenius concept of "slack"; the joke stuck for 30 years.',
      'Slackware\'s contribution was packaging discipline: a coherent installer, a sensible boot disk, and an upgrade path. It spread on floppies — 30-odd of them for a full install — and later via Walnut Creek\'s CD-ROMs, which is how most of the world first touched Linux. Its 4CD "Slackware 3.0" box was, for a generation, the doorway into Linux.',
      'Remarkably, Slackware never pivoted: it remains a no-frills, SysV-init, KISS-philosophy distribution maintained by Volkerding to this day, the oldest surviving Linux distribution by a comfortable margin. Its descendants include SUSE, whose first release was built on Slackware code.' ],
    links: [ ['Slackware', 'https://en.wikipedia.org/wiki/Slackware'], ['SLS (Softlanding Linux System)', 'https://en.wikipedia.org/wiki/Softlanding_Linux_System'], ['Linux distribution timeline', 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Linux_Distribution_Timeline.svg'] ] },

  { date: '1993-08-16', era: 'distros', kind: 'event', title: 'Debian is born', summary: 'Ian Murdock founds Debian, the fully community-built distro whose values shaped the ecosystem.', facts: [
    '"Deb" and "Ian" — Deb + Ian Linux',
    'The Debian Social Contract became free-software canon',
    'Ubuntu, and half the cloud, descend from it' ],
    more: [
      'Ian Murdock announced Debian in August 1993 as an experiment: could a distribution be built, maintained and governed entirely by a community of volunteers, with no company in charge? Debian — a portmanteau of his then-girlfriend Debra and his own name — answered yes, and in doing so invented much of the machinery of open-source governance: package maintainership, the dpkg/apt ecosystem, rigorous release testing ("stable", "testing", "unstable"), and eventually the Debian Social Contract and Free Software Guidelines.',
      'The Social Contract, written in 1997 with Bruce Perens, was so influential that the Open Source Definition was derived from it, and the DFSG remains the reference definition of what "free" means for dozens of distributions. Debian itself never shipped a corporate product; its influence is measured in descendants instead — Ubuntu, Linux Mint, Kali, and a large share of cloud images trace directly to it.',
      'Murdock\'s founding essay stated the goal plainly: Debian would be "the finest distribution ever created", assembled openly, in the spirit of Linux and GNU. That it outlived every corporate distro of its era is a standing argument that communities can operate at industrial scale.' ],
    links: [ ['Debian', 'https://en.wikipedia.org/wiki/Debian'], ['The Debian Social Contract', 'https://www.debian.org/social_contract'], ['Ian Murdock', 'https://en.wikipedia.org/wiki/Ian_Murdock'] ] },

  { date: '1994-03-14', version: '1.0', era: 'distros', kind: 'release', title: 'Linux 1.0', summary: 'Three years in, Linux 1.0 ships: networking, X11 and SCSI support in a kernel 176,250 lines long.', facts: [
    'Net support: TCP/IP, SLIP, and the Linux net-tools',
    'Ran on 80386 and up — a real Unix workalike',
    'Celebrated with a launch party in Helsinki' ],
    more: [
      'Linux 1.0 arrived on 14 March 1994: 176,250 lines of code, a decade after its author was born and a little over three years after the Usenet post. It had TCP/IP networking, SCSI support, X11-ready graphics abstractions, and support for 80386 through 80486-class hardware. Linus marked the occasion at a launch event in Helsinki — and, characteristically, was working on 1.1 patches within days.',
      'The road to 1.0 had nearly derailed: Linus had switched the project to the GPL in February 1992 (with version 0.12), a decision he later called the best he ever made, since it turned a personal hobby into something companies and individuals could invest in without fear. By 1.0, Linux had survived the Minix wars, grown a real development community, and acquired the singular property that made everything later possible: a kernel anyone could fork, patch, and redistribute, freely, forever.',
      'Contemporary reviews treated 1.0 as a curiosity — "a free Unix for your 386" — but developers noticed something else: the source tree was readable, the maintainers were reachable, and bug fixes landed in days rather than years. That development culture, as much as the code, became Linux\'s defining feature.' ],
    links: [ ['Linux kernel version history', 'https://en.wikipedia.org/wiki/Linux_kernel_versions'], ['The GPL decision, in Linus\'s words', 'https://en.wikipedia.org/wiki/History_of_Linux#Licensing'] ] },

  { date: '1994-06-15', era: 'distros', kind: 'event', title: 'Beowulf clusters', summary: 'NASA builds the first Beowulf cluster of commodity PCs running Linux — supercomputing goes mainstream-cheap.', facts: [
    '16 PCs running Linux outperformed million-dollar machines',
    'The blueprint for every "compute cluster" since',
    'HPC culture on Linux starts here' ],
    more: [
      'In the summer of 1994, researchers at NASA\'s Goddard Space Flight Center — Thomas Sterling and Donald Becker chief among them — bolted together 16 Intel DX4 PCs running Linux with channel-bonded Ethernet and called it a "Beowulf cluster". The machine cost tens of thousands of dollars and matched the throughput of supercomputers costing a hundred times more.',
      'The idea was radical in its simplicity: supercomputing had been the domain of exotic vector processors and proprietary interconnects, but Linux turned an ordinary network of PCs into a parallel machine. All the necessary ingredients were free — the operating system, MPI and PVM message passing, and commodity hardware. The Goddard team released the design openly, and "building a Beowulf" became a rite of passage for university HPC labs.',
      'The long shadow is enormous: today\'s Top500 supercomputers — including every exascale machine — are Beowulf\'s descendants, and the technique of buying cheap commodity nodes and scaling out became the economic foundation of the entire cloud-computing industry.' ],
    links: [ ['Beowulf cluster', 'https://en.wikipedia.org/wiki/Beowulf_cluster'], ['Thomas Sterling and the original design', 'https://en.wikipedia.org/wiki/Beowulf_(computing)'] ] },

  { date: '1995-03-07', version: '1.2', era: 'distros', kind: 'release', title: 'Beyond Intel', summary: 'Linux 1.2 ports to Alpha, MIPS, SPARC and m68k — the kernel stops being an x86 project.', facts: [
    'Alpha, MIPS, PowerPC and SPARC join x86 in one tree',
    '64-bit DEC Alpha ran Linux long before AMD64 existed',
    'The portability proved the design: one kernel, many machines' ],
    more: [
      'Linux 1.2, released on 7 March 1995, was the release that proved the kernel was not chained to Intel. Ports to the DEC Alpha, MIPS, SPARC and Motorola 68k landed in the tree, and each arrived because a community wanted it: DEC Alpha owners got a 64-bit Unix that out-ran their workstation vendors\' software; Sun users got Solaris-like freedom; Amiga and Atari fans got a modern OS for their m68k machines.',
      'Portability changed the kernel\'s architecture. The 1.2 era forced the first serious layering between architecture-specific and generic code, conventions that still shape the source tree today (arch/ vs drivers/), and it seeded the culture that later absorbed every architecture from mainframes to microcontrollers.',
      'It also changed the audience. Unix vendors and researchers who would never touch a PC could now take the kernel seriously — and DEC\'s own engineers famously marveled that Linux on Alpha outperformed their own Unix. The hobby project had become hardware-independent infrastructure.' ],
    links: [ ['Linux kernel porting history', 'https://en.wikipedia.org/wiki/Linux_kernel#Porting'], ['DEC Alpha', 'https://en.wikipedia.org/wiki/DEC_Alpha'] ] },

  { date: '1995-11-04', era: 'distros', kind: 'event', title: 'Red Hat Software', summary: 'Marc Ewing and Bob Young found Red Hat — commercial Linux, RPM packaging and an enterprise roadmap.', facts: [
    'Red Hat Linux 2.0 shipped with RPM, the packaging idea that stuck',
    'Proved you could sell free software and survive',
    'Eight years later it became the first open-source company on the Fortune 500' ],
    more: [
      'Red Hat began as a distribution built by Marc Ewing — so named because he wore a red lacrosse cap from Cornell while fixing machines — and was turned into a company in 1995 by Bob Young, who ran a mail-order Linux book and CD business called ACC. Their insight was deceptively simple: companies wanted Linux with someone to call, and they would pay for it without demanding the software become proprietary.',
      'The packaging system Red Hat created, RPM, became the ecosystem\'s most influential idea after the GPL itself: reproducible, verifiable software installation and dependency tracking. The business model — free download, paid support — was the first durable business model for open source, and it seeded an entire industry (SUSE, Mandrake, Caldera, and eventually the whole "enterprise Linux" category).',
      'Red Hat\'s trajectory validated the model spectacularly: an IPO in 1999, decades of enterprise contracts, a $34 billion acquisition by IBM in 2019, and by then the role of the largest single corporate contributor to the kernel. The lesson — that "free software" and "a real business" were not opposites — rewrote the software industry\'s assumptions within a decade.' ],
    links: [ ['Red Hat', 'https://en.wikipedia.org/wiki/Red_Hat'], ['RPM Package Manager', 'https://en.wikipedia.org/wiki/RPM_Package_Manager'], ['History of Red Hat Linux', 'https://en.wikipedia.org/wiki/Red_Hat_Linux'] ] },

  { date: '1996-05-09', era: 'distros', kind: 'event', title: 'Tux is born', summary: 'Linus mentions liking penguins; Larry Ewing\'s GIMP-rendered mascot makes the kernel unforgettable.', facts: [
    'The story involves a penguin bite at a zoo — claimed by Linus',
    'Larry Ewing\'s "Tux" image, made in GIMP, became the standard',
    'The name is from "Torvalds Unix" — TUX' ],
    more: [
      'Linux needed a mascot, and in 1996 the community held a design conversation on the kernel mailing list. Linus mentioned a fondness for penguins — reinforced, he has cheerfully claimed, by being bitten by one at a zoo — and Alan Cox\'s suggestion of a penguin stuck. Larry Ewing\'s GIMP-rendered image, with its smug expression and orange beak, became the definitive Tux, distributed under a licence that required only attribution.',
      'The name is usually credited to James Hughes, who proposed "Torvalds Unix" — tux. The image spread everywhere: plush toys, kernel patches, sports team logos, and the storied "Tux the Penguin" that appears in boot splash screens worldwide.',
      'A mascot sounds trivial, but branding mattered for a volunteer project competing against corporate marketing. Tux gave Linux an instantly recognizable identity, softened its image for the enterprise buyers of the late 1990s, and — in the plush-toy economy of conferences — arguably did more for kernel evangelism than a thousand benchmarks.' ],
    links: [ ['Tux (mascot)', 'https://en.wikipedia.org/wiki/Tux_(mascot)'], ['Larry Ewing\'s original image and terms', 'https://isc.tamu.edu/~lewing/linux/'] ] },

  { date: '1996-06-09', version: '2.0', era: 'distros', kind: 'release', title: 'Symmetric multiprocessing', summary: 'Linux 2.0 runs multiple CPUs at once and supports hardware most vendors considered Unix-only.', facts: [
    'SMP: the kernel scales across processors — a superpower for servers',
    'Alpha, MIPS, PowerPC and SPARC ports mature alongside x86',
    'Fine-grained locking, internal improvements and a bigger network stack' ],
    more: [
      'Linux 2.0, released on 9 June 1996 after two years of 1.2 development, brought symmetric multiprocessing to mainline: the kernel could finally use every processor in the box. For a project frequently dismissed as a toy, running multi-CPU servers was the single most important credibility upgrade of the decade — servers, not desktops, were where Unix lived.',
      '2.0 also broadened the hardware story dramatically. More architectures matured, the memory manager was reworked, and the networking stack gained support for more protocols and interface types. The release doubled the source tree relative to 1.2 and marked the point where Linux began to look, from the outside, like a serious Unix for workstations and small servers.',
      'Culturally, 2.0 began the era of the "stable" and "development" split (odd-numbered minor versions were experimental), a convention that governed the project for the next decade and shaped how the ecosystem coordinated around releases.' ],
    links: [ ['Linux 2.0 announcement (kernel.org archive)', 'https://kernel.org/pub/linux/kernel/v2.0/'], ['SMP', 'https://en.wikipedia.org/wiki/Symmetric_multiprocessing'] ] },

  { date: '1996-08-01', era: 'scaling', kind: 'event', title: 'Apache rules the web', summary: 'Apache, overwhelmingly running on Linux and BSD, powers more web servers than any rival.', facts: [
    'Netcraft surveys put Apache ahead of every commercial server',
    'Linux + Apache + MySQL + Perl/PHP = the LAMP stack is born',
    'The web\'s early infrastructure quietly ran on free software' ],
    more: [
      'By late 1996 the Netcraft Web Server Survey showed Apache — the free web server grown out of the NCSA httpd "patch" project — passing every commercial rival, and a very large share of those Apache servers ran on Linux or BSD. The pattern became the template for Linux\'s server conquest: a killer free application creates demand for a free operating system, which then attracts more applications.',
      'The pairing hardened into the LAMP stack (Linux, Apache, MySQL, PHP/Perl/Python), the default architecture of the web for a decade. Its defining property was cost: a startup could serve a million users on a rented PC and zero software licences. Internet culture — mailing lists, forums, the early blogosphere — was built on that arithmetic.',
      'For the kernel project, the Apache era meant Linux increasingly ran in data centres, which meant drivers, SMP, and network performance were now tested by real production traffic at scale — feedback that drove the next three years of kernel development.' ],
    links: [ ['Apache HTTP Server', 'https://en.wikipedia.org/wiki/Apache_HTTP_Server'], ['Netcraft Web Server Survey', 'https://en.wikipedia.org/wiki/Netcraft'], ['LAMP', 'https://en.wikipedia.org/wiki/LAMP_(software_bundle)'] ] },

  { date: '1997-05-05', era: 'scaling', kind: 'event', title: 'kernel.org opens', summary: 'kernel.org becomes the canonical home of the kernel source — the "Linux Central Archive".', facts: [
    'Primary site backed by mirrors worldwide',
    'Every official kernel release since has appeared here first',
    'Still the trust anchor: release tags are GPG-signed' ],
    more: [
      'As the kernel\'s contributor base grew, so did the need for a canonical, trusted home for the source. kernel.org — the "Linux Central Archive" run by the Linux Foundation and volunteers — became that home, hosting every official release tarball and, later, the authoritative git repositories of Linus Torvalds and the subsystem maintainers.',
      'The archive\'s operational history is a story of the internet\'s growth: FTP mirrors in dozens of countries, bandwidth donated by universities and companies, and a security model built on signed release tags so anyone can verify that a tarball is genuine. It survived — and famously survived a 2011 compromise, after which the entire infrastructure was rebuilt from scratch with stricter authentication.',
      'kernel.org is also where the kernel\'s unusual governance is visible to anyone: Linus\'s tree sits beside the -stable trees and subsystem trees, and the whole distributed hierarchy of maintainers is public infrastructure, not a corporate asset.' ],
    links: [ ['kernel.org', 'https://www.kernel.org/'], ['The 2011 incident and response', 'https://lwn.net/Articles/457146/'] ] },

  { date: '1998-05-01', era: 'scaling', kind: 'event', title: 'Oracle commits', summary: 'Larry Ellison\'s Oracle ports its flagship database to Linux — Wall Street notices the penguin.', facts: [
    'First big enterprise database vendor on Linux',
    'Followed by Informix, Sybase and IBM within a year',
    'The "is it ready for business?" question starts to close' ],
    more: [
      'In May 1998, Oracle announced it would port its flagship database to Linux — the first time a top-tier enterprise software vendor had bet on the kernel. Databases were the workload that mattered: if Oracle ran on Linux, then Linux was an operating system for companies, not just for hackers and ISPs.',
      'The announcement had a catalytic effect. Within months, Informix, Sybase and IBM had followed, hardware vendors began offering Linux preinstalled, and the venture capital world discovered open source. Linus, who had spent years dodging questions about whether Linux was "ready for the enterprise", found the market answered the question for him.',
      'The move also changed the kernel itself. Enterprise workloads demanded better scalability, journaled filesystems, and rigorous testing — the priorities that shaped the 2.2 and 2.4 series. Linux\'s famous roadmap debates began in earnest the day the first big customer showed up.' ],
    links: [ ['Oracle Corporation', 'https://en.wikipedia.org/wiki/Oracle_Corporation'], ['Linux adoption timeline', 'https://en.wikipedia.org/wiki/Linux_adoption'] ] },

  { date: '1998-10-30', era: 'scaling', kind: 'event', title: 'The Halloween documents', summary: 'Internal Microsoft memos leak: they call Linux a "best-case" threat and consider FUD campaigns.', facts: [
    'Eric Raymond published the leaked memos on Halloween',
    'Microsoft admitted Linux was "of very high quality" and beating NT',
    'The leak became free software\'s most famous endorsement-by-fear' ],
    more: [
      'On Halloween 1998, Eric Raymond published a pair of leaked Microsoft memoranda analysing Linux and open source. Written by Vinod Valloppillil with input from senior engineers, the memos concluded that Linux was "of very high quality", was winning developer mindshare, and represented a genuine threat to Windows NT — and canvassed strategies for countering it, from "FUD" tactics to protocol de-standardisation.',
      'The memos were the ultimate backhanded compliment: the world\'s dominant software company, in its own words, describing the free kernel as a serious competitive threat. They are also a startlingly candid analysis of the open-source development model, written by people studying it as a competitive force — which is why they became required reading in business schools studying open source.',
      'The episode crystallised the industry shift. Within two years Microsoft would be forced to concede that "Linux is a fact of life", and within twenty it would be shipping Linux-based systems and contributing to the kernel — a reversal often traced, at least in narrative, to the Halloween documents.' ],
    links: [ ['Halloween documents (annotated)', 'https://en.wikipedia.org/wiki/Halloween_documents'], ['Eric Raymond\'s original publication', 'https://www.catb.org/~esr/halloween/'] ] },

  { date: '1999-01-25', version: '2.2', era: 'scaling', kind: 'release', title: 'Linux 2.2', summary: 'Better SMP, rewritten networking and PS/2 mice — 2.2 makes Linux a dependable multi-user server.', facts: [
    'Networking stack rewritten: faster TCP/IP, firewalling with ipchains',
    'The 2GB file ceiling lifted for many workloads',
    'Alan Cox maintained the stable 2.2 series famously well' ],
    more: [
      'Linux 2.2, released on 25 January 1999 after 14 months of development on the 2.1 tree, was the release that made Linux boring — in the best sense. The networking stack was substantially rewritten (ipchains firewalling, better TCP performance, multicast routing), the virtual memory manager was reworked, and the kernel gained support for a much wider range of disk and bus hardware.',
      '2.2\'s steward became as famous as the release itself: Alan Cox, the Welsh hacker who maintained the -stable series, was for years the second most important person in the kernel, arbitrating driver submissions and shepherding fixes with a mixture of encyclopedic knowledge and blunt wit. His 2.2 series became the backbone of the dot-com era\'s server farms.',
      'It was also the kernel of the era\'s cultural landmarks: Linux peaked in mindshare among ISPs and web hosts, the first Linux World Conference was held, and Red Hat\'s IPO later that year turned the kernel into a financial phenomenon. The kernel had become, quietly, the infrastructure of the new economy.' ],
    links: [ ['Linux 2.2 release notes (archive)', 'https://kernel.org/pub/linux/kernel/v2.2/'], ['Alan Cox', 'https://en.wikipedia.org/wiki/Alan_Cox'], ['ipchains and Linux firewalling history', 'https://en.wikipedia.org/wiki/Netfilter'] ] },

  { date: '1999-08-11', era: 'scaling', kind: 'event', title: 'Red Hat goes public', summary: 'Red Hat\'s IPO closes up 138% on day one — free software is suddenly a market category.', facts: [
    'Set records for a company that gave its product away',
    'VA Linux\'s IPO months later rose nearly 700% in a day — still a record',
    'The dot-com bubble popped — Linux did not' ],
    more: [
      'On 11 August 1999 Red Hat priced its IPO at $14 and closed the day at $33.38, up 138% — a remarkable result for a company whose product could be downloaded for free. Four months later, VA Linux (VA Research\'s successor, run by Larry Augustin) achieved the best first-day gain in IPO history to that point, closing up nearly 700%.',
      'The financial community had discovered "open source" as an asset class. The term itself had been coined only in February 1998, at a strategy session in Palo Alto organised in part by Eric Raymond and Tim O\'Reilly — a rebranding designed to make free software legible to corporations. The bubble that followed was real, and when it burst in 2000 many of the new Linux companies died.',
      'What survived was the substance: IBM\'s billion-dollar commitment, Oracle\'s port, and a kernel whose development was by then spread across hundreds of companies. The dot-com crash killed Linux\'s stock hype, but the software spent the next five years eating the server market.' ],
    links: [ ['Red Hat IPO coverage (retrospectives)', 'https://en.wikipedia.org/wiki/Red_Hat'], ['The "open source" naming meeting', 'https://en.wikipedia.org/wiki/Open-source-software#History'], ['VA Linux IPO record', 'https://en.wikipedia.org/wiki/VA_Linux_Systems'] ] },

  { date: '2000-12-12', era: 'enterprise', kind: 'event', title: 'IBM bets a billion', summary: 'IBM pledges $1 billion for Linux in 2001 — mainframes, servers and ceaseless enterprise polish.', facts: [
    'Linux gained mainframe (s390) support, running on z/OS machines',
    'IBM ran famous TV ads: "Peace, love and Linux"',
    'Enterprise FUD about Linux was effectively over' ],
    more: [
      'In December 2000, IBM announced it would spend $1 billion on Linux in 2001 — porting it to mainframes, adopting it across its server lines, and retraining thousands of its own engineers. For a company that had spent the previous decade marketing against free software, the reversal was seismic.',
      'The practical consequences were enormous: kernel support for IBM\'s s390 mainframe architecture arrived (Linux running as hundreds of virtual machines on a single zSeries box — an astonishing demonstration of the kernel\'s flexibility), and enterprise customers received the one thing they had always demanded: a vendor with a support contract and a century of credibility.',
      'The marketing was unforgettable — "Peace, Love and Linux" ads, chalk graffiti on city sidewalks (one of which got IBM\'s agency arrested in San Francisco) — but the substance was what mattered. After IBM\'s bet, the question "is Linux safe for the enterprise?" stopped being asked in earnest. The kernel now had the world\'s largest IT companies as stakeholders, and they never left.' ],
    links: [ ['IBM and Linux (history)', 'https://en.wikipedia.org/wiki/Linux_adoption#Mainframes'], ['IBM Linux commercials', 'https://en.wikipedia.org/wiki/IBM#Linux'] ] },

  { date: '2001-01-04', version: '2.4', era: 'enterprise', kind: 'release', title: 'Linux 2.4', summary: 'USB, 64GB of RAM, IA-64 and a decade of driver growth — 2.4 is the kernel of the server boom.', facts: [
    'Big hardware support growth: USB, FireWire, PCMCIA rework',
    'Journaled filesystems (ReiserFS) in-tree; ext3 imminent',
    '2.4.0 was late — and all the more polished for it' ],
    more: [
      'Linux 2.4.0 arrived on 4 January 2001, months behind schedule, and became the workhorse kernel of the enterprise Linux boom. It brought the VM rework that let x86 systems address up to 64GB of RAM, USB support mature enough to matter, IA-64 (Itanium) support, and a vastly expanded driver catalogue covering the hardware enterprises actually bought.',
      'The 2.4 era also normalised journaled filesystems: Hans Reiser\'s ReiserFS entered the tree, and Stephen Tweedie\'s ext3 arrived in 2.4.15 — meaning Linux servers could finally survive power loss without an hour of fsck. Combined with Samba, Linux boxen increasingly replaced Windows NT file servers, often with better stability.',
      'The 2.4 period is also remembered for its conflicts: Linus\'s VM versus Andrea Arcangeli\'s competing rewrite (the "rmap wars"), and the beginning of tensions over release discipline that would eventually produce the -mm tree, the 2.6 development model, and the modern merge-window rhythm. The kernel was now too big for any single person\'s inbox — the infrastructure of distributed development had to grow up.' ],
    links: [ ['Linux 2.4 changes (kernelnewbies)', 'https://kernelnewbies.org/LinuxChanges'], ['ReiserFS', 'https://en.wikipedia.org/wiki/ReiserFS'] ] },

  { date: '2001-11-23', version: '2.4.15', era: 'enterprise', kind: 'release', title: 'ext3: data survives crashes', summary: 'The ext3 journaled filesystem merges — a power cut no longer means fsck purgatory.', facts: [
    'Stephen Tweedie\'s journaling layer, mountable on existing ext2 disks',
    'Made Linux safe for databases and impatient sysadmins',
    'Default filesystem of the Red Hat era' ],
    more: [
      'When ext3 was merged in November 2001, it solved the single most damaging complaint about Linux servers: after a crash or power loss, an ext2 filesystem could take hours to fsck before the machine was usable again. ext3\'s journal meant recovery in seconds, and — because Stephen Tweedie designed it to be an extension of ext2 — admins could convert existing filesystems in place, without reformatting.',
      'That pragmatic upgrade path made ext3 the default filesystem of the Red Hat Enterprise Linux era and the largest deployment of a journaled filesystem in the free-software world. Its "ordered" mode balanced performance and safety in a way that became the reference point for later designs.',
      'The release it shipped in, 2.4.15, is also remembered for an infamous bug in the VM subsystem that crashed under heavy load — Linus quickly marked it "don\'t use" and 2.4.16 followed within a week. The episode became a permanent lesson in why the -stable series, and later kernel testing infrastructure, existed.' ],
    links: [ ['ext3', 'https://en.wikipedia.org/wiki/Ext3'], ['Journaled file systems compared', 'https://en.wikipedia.org/wiki/Journaling_file_system'] ] },

  { date: '2002-02-12', era: 'enterprise', kind: 'event', title: 'The BitKeeper years', summary: 'Linus adopts proprietary BitKeeper to coordinate thousands of changes — and stores up a problem.', facts: [
    'Kernel-scale distributed version control didn\'t exist yet',
    'Linus: "I\'m a hypocrite, but I want my patches"',
    'The 2005 license dispute set up the creation of git' ],
    more: [
      'By 2002 the kernel\'s development process was straining under its own success: thousands of patches flowed through mailing lists and Linus\'s inbox, tracked by hand in tarball diffs. Larry McVoy\'s BitKeeper — a proprietary distributed version-control system — offered a genuinely better workflow, and Linus adopted it, with a free-of-charge licence for open-source use, over loud objections from the free-software community.',
      'The compromise held for three years and demonstrably improved kernel development: BitKeeper\'s distributed model (every user a repository, changesets as first-class objects) was exactly the shape the project needed. It also planted the seed of its own replacement — Linus studied it closely enough to know precisely what a replacement had to do.',
      'In 2005 the free licence was withdrawn after Andrew Tridgell reverse-engineered the protocol, and the kernel was suddenly version-control-less. What Linus built in response, in roughly ten days, was git — an outcome that reshaped all software development, far beyond the kernel.' ],
    links: [ ['BitKeeper', 'https://en.wikipedia.org/wiki/BitKeeper'], ['Version control before git', 'https://en.wikipedia.org/wiki/Linux_kernel#Source_code_management'] ] },

  { date: '2002-05-14', era: 'enterprise', kind: 'event', title: 'Linux on PlayStation 2', summary: 'Sony ships the PS2 Linux Kit in the US — a game console that boots the kernel and runs GCC.', facts: [
    'Included a 40GB hard drive, keyboard, mouse and VGA adapter',
    'Hobbyists rendered demos and built clusters with them',
    'A wink at the future: Linux in every living room' ],
    more: [
      'In 2002 Sony began selling the PS2 Linux Kit outside Japan — a broadband adapter, 40GB hard disk, keyboard, mouse and VGA adapter that turned the best-selling game console of the era into a MIPS Linux workstation. For $199, hobbyists got a bootable kernel, gcc, and a 294.9 MHz Emotion Engine to play with.',
      'The kit\'s significance was less the product than the precedent: a consumer games machine, sold by the world\'s largest console maker, that shipped a bootloader and kernel source. The NCSA famously built a 65-node PS2 cluster (a million-dollar-equivalent machine for the price of consoles), and the demoscene produced a wave of PS2 Linux demos.',
      'It was also a dry run for the future: within a decade, the kernel would be running in televisions, phones, set-top boxes and every major games-adjacent device — a trajectory this odd little kit presaged by a decade.' ],
    links: [ ['PlayStation 2 Linux', 'https://en.wikipedia.org/wiki/PlayStation_2_linux'], ['The NCSA PS2 cluster', 'https://en.wikipedia.org/wiki/PlayStation_2_cluster'] ] },

  { date: '2003-11-04', era: 'modern', kind: 'event', title: 'Novell buys SUSE', summary: 'Novell\'s $210M acquisition of SUSE and Ximian puts a second enterprise Linux company on the map.', facts: [
    'Enterprise support contracts become a real market',
    'Ximian brought Miguel de Icaza, Mono and GNOME talent',
    'Red Hat no longer stands alone in the enterprise' ],
    more: [
      'In late 2003 Novell — once the colossus of network operating systems with NetWare — bought both Ximian (August) and SUSE (November) for a combined ~$400 million, catapulting itself into the Linux business. For the first time, the enterprise Linux market had two credible large vendors, which meant real competition on support, certification, and pricing.',
      'The acquisitions brought significant engineering talent into the kernel and GNOME ecosystems, and SUSE\'s YaST configuration tooling plus its German enterprise customer base gave Novell a credible rival to Red Hat. The 2006 Microsoft–Novell interoperability deal that followed was controversial in the community but confirmed that even Microsoft now treated Linux as a fixture of enterprise computing.',
      'The acquisition also cemented a pattern: every few years, a major proprietary software company would buy its way into Linux rather than try to compete with it — a pattern that has continued, via IBM/Red Hat and others, to the present day.' ],
    links: [ ['SUSE Linux history', 'https://en.wikipedia.org/wiki/SUSE_Linux_Enterprise'], ['Novell', 'https://en.wikipedia.org/wiki/Novell'] ] },

  { date: '2003-12-17', version: '2.6', era: 'modern', kind: 'release', title: 'Linux 2.6', summary: 'Preemptible kernel, O(1) scheduler, NPTL threading and ALSA — the modern kernel era begins.', facts: [
    'NPTL: threading fast enough for enterprise Java on Linux',
    'ALSA replaces OSS; the udev era begins',
    'Scales from phones to 4096-way NUMA machines' ],
    more: [
      'Linux 2.6, released on 17 December 2003 after a famously open, fast-moving development cycle, was the largest and most consequential rewrite in the kernel\'s history. Ingo Molnar\'s O(1) scheduler made scheduling costs independent of process count and fixed the interactivity complaints that plagued 2.4 desktops. The new Native POSIX Thread Library (NPTL), developed with glibc, made threads cheap enough that Red Hat could run enterprise Java workloads — a headline benchmark win that changed IT purchasing decisions.',
      '2.6 merged the ALSA sound subsystem, made the kernel preemptible (audio and desktop apps stopped glitching under load), and introduced a scalable, unified device model that udev and later sysfs built upon. NUMA support, audit, and much else arrived in the following point releases.',
      'Equally important was the process: 2.6 established the release cadence and subsystem-maintainer hierarchy the project still uses, and marked the moment Linux became a desktop-viable, enterprise-grade, embedded-capable kernel all at once. Nearly every architectural pillar of the 2026 kernel — its scheduler framework, device model, and threading — traces directly to decisions made for 2.6.' ],
    links: [ ['Linux 2.6 changes (kernelnewbies)', 'https://kernelnewbies.org/LinuxChanges'], ['O(1) scheduler and NPTL', 'https://en.wikipedia.org/wiki/Scheduler_(computing)'] ] },

  { date: '2004-10-20', era: 'modern', kind: 'event', title: 'Ubuntu 4.10', summary: 'Canonical\'s first release, "Warty Warthog", promises "Linux for human beings" every six months.', facts: [
    'Shuttleworth funded it after selling Thawte to VeriSign',
    'Screenshot-friendly installer, polish-first philosophy',
    'Became the default answer to "which distro should I try?"' ],
    more: [
      'Ubuntu 4.10 ("Warty Warthog"), released on 20 October 2004, was the most consequential distribution launch since Red Hat\'s. Mark Shuttleworth, who had made a fortune selling his certificate authority Thawte to VeriSign and flown to orbit as a space tourist, funded a Debian-derived distribution with an explicit mission: Linux on every desktop, polished, free, and on a relentless six-month schedule.',
      'The engineering choices were equally consequential: a curated, opinionated package set; humanized names for releases; upstream-first policies that poured fixes back into Debian and GNOME; free ship-it CDs mailed worldwide (at a loss) to anyone who asked; and a community architecture (forums, Launchpad) designed for newcomers rather than adepts.',
      'Within three years Ubuntu was the most-searched-for Linux distribution and had fundamentally changed the desktop Linux conversation — from "can you make it work?" to "which desktop do you want?". The Linux desktop\'s later mainstream moments (Dell shipping Ubuntu, Windows\'s Linux tooling) trace a direct line to this release.' ],
    links: [ ['Ubuntu', 'https://en.wikipedia.org/wiki/Ubuntu'], ['Ubuntu version history', 'https://en.wikipedia.org/wiki/Ubuntu_version_history'] ] },

  { date: '2005-04-16', era: 'modern', kind: 'event', title: 'Git in ten days', summary: 'BitKeeper\'s free license is pulled; Linus writes git as "a content-addressable filesystem" in about ten days.', facts: [
    'Merged its own kernel tree within weeks of the dispute',
    'Now runs most of the world\'s software development',
    '"I\'m an egotistical bastard, and I name all my projects after myself. First Linux, now git."' ],
    more: [
      'In April 2005 the BitKeeper free licence was withdrawn, leaving the kernel without version control. Linus took a few days off and wrote git — self-described as "a stupid content tracker" built on a content-addressable filesystem, with the properties the kernel actually needed: distributed by default, cryptographically verifiable history, cheap branching, and performance at kernel scale. The first merge into his own tree happened within days; the 2.6.12 release in June 2005 was the first managed with git.',
      'What followed is one of software\'s great cascading success stories. Git\'s model — everyone has a full history, trust is cryptographic, branching is free — turned out to fit not just kernels but all software. Within a decade it had won the version-control wars outright, and platforms built on it (GitHub above all) restructured how the world writes software.',
      'The kernel, in turn, gained an even more scalable development process: subsystem trees pulled by Linus, bisectability, and signed tags — all of which depend on git\'s design. A crisis over a proprietary tool produced, almost accidentally, the most important developer tool of the century.' ],
    links: [ ['Git', 'https://en.wikipedia.org/wiki/Git'], ['Linus\'s original announcement and rationale', 'https://lwn.net/Articles/131657/'], ['A decade of git (kernel.org talk notes)', 'https://git-scm.com/book/en/v2'] ] },

  { date: '2007-01-22', era: 'modern', kind: 'event', title: 'The Linux Foundation', summary: 'OSDL and the Free Standards Group merge to form the Linux Foundation — vendors fund the kernel full-time.', facts: [
    'Employs maintainers including Greg Kroah-Hartman and Linus himself',
    'Runs kernel.org and the collaboration summits',
    'Hundreds of companies now contribute instead of forking' ],
    more: [
      'The Linux Foundation was formed in January 2007 from the merger of the Open Source Development Labs (which employed Linus) and the Free Standards Group. Its premise: the kernel had outgrown ad-hoc funding, and the companies that depended on it — which by then included nearly every major hardware and cloud firm — should pool resources to sustain it.',
      'The Foundation\'s model proved durable: it directly employs key maintainers, funds infrastructure (kernel.org), hosts the annual Collaboration Summit and Linaro-like collaboratives (Yocto Project, Zephyr, LF Networking), and provides legal and travel support for the community. It also runs the technical advisory machinery that keeps hundreds of competing companies cooperating on one kernel rather than forking hundreds of kernels.',
      'The result is the kernel\'s peculiar and successful economics: a public good financed by many self-interested contributors, with an estimated multi-billion-dollar annual development value and no single point of control. It is, quietly, one of the most successful shared-infrastructure projects ever run.' ],
    links: [ ['The Linux Foundation', 'https://en.wikipedia.org/wiki/Linux_Foundation'], ['OSDL history', 'https://en.wikipedia.org/wiki/Open_Source_Development_Labs'] ] },

  { date: '2007-02-04', version: '2.6.20', era: 'modern', kind: 'release', title: 'KVM merged: virtualize everything', summary: 'KVM — the kernel-based virtual machine — lands in mainline, turning Linux into a hypervisor.', facts: [
    'Written by Avi Kivity; announced Oct 2006, merged here',
    'Became the engine of the cloud: AWS, Google Cloud, OpenStack',
    'Competes with VMware by being a kernel feature, not a product' ],
    more: [
      'KVM turned the Linux kernel itself into a hypervisor by leaning on hardware virtualization (Intel VT-x, AMD-V): each virtual machine became a Linux process, scheduled and accounted by the ordinary kernel. Avi Kivity announced it in October 2006; it merged into 2.6.20 in early 2007 — a startlingly fast mainline adoption.',
      'The design was the winning move. Rather than a standalone hypervisor product, KVM made virtualization a *feature of the kernel*, inheriting its scheduler, memory management, I/O stack and driver base. QEMU provided device emulation, and the combination matured quickly enough that by the early 2010s, "the cloud" overwhelmingly meant Linux KVM guests.',
      'Every major public cloud, OpenStack, and the server-virtualization businesses of Red Hat, SUSE and Canonical were built on it. When AWS or Google Cloud runs your VM, the kernel under it is, in a very real sense, the same kernel running the timeline you are reading.' ],
    links: [ ['KVM', 'https://en.wikipedia.org/wiki/Kernel-based_Virtual_Machine'], ['QEMU', 'https://en.wikipedia.org/wiki/QEMU'], ['Hardware virtualization', 'https://en.wikipedia.org/wiki/X86_virtualization'] ] },

  { date: '2008-01-24', version: '2.6.24', era: 'modern', kind: 'release', title: 'cgroups land', summary: 'Control groups merge — per-process resource accounting that will one day run the container boom.', facts: [
    'Google\'s patchset for isolating CPU, memory and I/O shares',
    'The foundation of LXC, Docker and Kubernetes',
    'cgroup v2 unified the interface years later' ],
    more: [
      'Control groups ("cgroups"), merged in 2.6.24 in January 2008, grew out of Google\'s internal need to guarantee resource shares among thousands of processes sharing machines. Paul Menage and colleagues\' patchset let the kernel partition CPU, memory, block I/O and other resources among process groups — the missing primitive for running many workloads safely on one kernel.',
      'Combined with namespaces (which isolate what processes can *see*), cgroups supplied everything a container needed: isolation of view plus limits on consumption. LXC (2008) assembled them into system containers; Docker (2013) added images and a workflow; Kubernetes (2015) added orchestration. Every container running today — in every cloud — is cgroups doing their job.',
      'The feature\'s long history also taught the community hard lessons: cgroup v1 grew dozens of overlapping controllers with inconsistent semantics, and the eventual cgroup v2 (merged 4.5) unified the interface at the cost of years of migration work — a reminder that even the kernel\'s most successful features iterate through painful lessons.' ],
    links: [ ['cgroups', 'https://en.wikipedia.org/wiki/Cgroups'], ['Namespaces', 'https://en.wikipedia.org/wiki/Linux_namespaces'], ['From cgroups to Docker (timeline)', 'https://en.wikipedia.org/wiki/Docker_(software)'] ] },

  { date: '2008-09-23', era: 'takeover', kind: 'event', title: 'Android announced', summary: 'Google unveils Android, a Linux-based OS for phones. The HTC Dream ships a month later.', facts: [
    'Linux kernel + Apache-licensed userspace',
    'Billions of devices since — the largest Linux deployment ever',
    'Forked kernel features flowed back into mainline for years' ],
    more: [
      'When Google unveiled Android on 23 September 2008 (the HTC Dream shipped a month later), it announced more than a phone: it was the largest deployment of the Linux kernel ever conceived. Every Android device runs the kernel — modified by Google and vendors, but the same codebase — and within a decade Android alone made Linux the most-shipped operating system in history.',
      'Android\'s kernel story is a lesson in upstream symbiosis. Early Android kernels carried heavy out-of-tree patches (wakelocks, binder, ashmem), which caused years of friction with mainline. But the sheer scale of Android forced mainline to adapt: mainline grew wakelock replacements (autosleep), binder finally entered mainline (4.4), and the Generic Kernel Image project (5.4+) exists precisely to make Android\'s kernel maintainable upstream.',
      'The economics completed the takeover: a free, no-royalty kernel let thousands of device makers build products on Linux, while Google\'s engineering muscle fixed the kernel\'s mobile weaknesses. The phone in your pocket is a mainline-adjacent Linux box with a very good userspace.' ],
    links: [ ['Android (operating system)', 'https://en.wikipedia.org/wiki/Android_(operating_system)'], ['Android Linux kernel', 'https://source.android.com/docs/core/architecture/kernel'], ['Binder in mainline', 'https://lwn.net/Articles/700501/'] ] },

  { date: '2008-12-24', version: '2.6.28', era: 'takeover', kind: 'release', title: 'ext4 stable', summary: 'ext4 graduates to stable: extents, delayed allocation and millions of files per directory.', facts: [
    'Maximum filesystem size: 1 exabyte',
    'Theodore Ts\'o and the ext community\'s workhorse',
    'Default fs of Ubuntu 9.10 and Android 4.x' ],
    more: [
      'ext4 became stable in 2.6.28 on Christmas Eve 2008, capping a seven-year evolution of the ext family. Its headline features were extents (replacing the block-mapping schemes that made large files slow), delayed allocation (better write patterns and less fragmentation), journal checksumming, and the ability to address a 1-exabyte filesystem.',
      'Theodore Ts\'o — the original author of ext2 back in 1992 and later the kernel\'s filesystem maintainer — drove the development, and the release marked a maturity milestone: Linux now had a filesystem good enough to be the default everywhere from laptops to Android devices, without exotic deployment.',
      'ext4\'s long tail is remarkable: it remains the default filesystem of mainstream distributions years later, powers Android devices by the hundreds of millions, and coexists in the modern tree with btrfs, f2fs and xfs as the pragmatic, boring, bulletproof choice — exactly what a kernel wants in a default.' ],
    links: [ ['ext4', 'https://en.wikipedia.org/wiki/Ext4'], ['ext4 and delayed allocation (LWN)', 'https://lwn.net/Articles/286157/'] ] },

  { date: '2009-07-07', era: 'takeover', kind: 'event', title: 'Chrome OS announced', summary: 'Google announces Chrome OS — a browser-first Linux desktop for the post-PC era.', facts: [
    'Built on the kernel with a minimal Gentoo-derived userspace',
    'Chromebooks later dominate US classrooms',
    'Linux-based OSes now ran on phones, TVs and laptops' ],
    more: [
      'On 7 July 2009 Google announced Chrome OS, an operating system whose entire user interface is a browser — and whose foundation is the Linux kernel with a hardened, verified-boot userspace derived from Gentoo. The bet: the web had become the platform, and a fast, safe, instantly-updated browser on a Linux base was enough for most computing.',
      'The project\'s kernel significance was subtle but deep: Chrome OS forced the kernel to work in an environment with extreme security requirements (verified boot, sandboxed rendering, fast recovery images) and extreme update discipline (new kernel every four weeks in modern versions). Chromium OS sources and fixes flowed upstream continuously.',
      'The cultural success outpaced the technical: Chromebooks became the best-selling laptops in US education and, at times, the best-selling laptops overall. For a kernel once dismissed as a hobbyist toy, running a consumer OS from the world\'s biggest advertising company was another quiet revolution.' ],
    links: [ ['ChromeOS', 'https://en.wikipedia.org/wiki/ChromeOS'], ['Chromium OS', 'https://en.wikipedia.org/wiki/ChromiumOS'] ] },

  { date: '2009-12-03', version: '2.6.32', era: 'takeover', kind: 'release', title: 'The first long-term support', summary: '2.6.32 is designated long-term supported — enterprises get a kernel that stays patched for years.', facts: [
    'LTS branches: security fixes without surprises',
    'KSM, KVM improvements and devtmpfs arrive here',
    'RHEL 6 shipped on this kernel' ],
    more: [
      'With 2.6.32 in December 2009, the kernel formalized the "long-term support" release: a branch maintained with backported fixes for years rather than months. The rationale was enterprise reality — distros like Red Hat built multi-year support cycles, and upstream and vendors both benefited from a shared, stable base to patch.',
      '2.6.32 itself was a solid release: Kernel Samepage Merging (KSM) for memory-efficient virtualization, KVM performance work, devtmpfs (ending the cold-boot device-node dance), and the usual driver flood. Red Hat Enterprise Linux 6 and SUSE Linux Enterprise 11 were built on it, and it ran in production for over a decade.',
      'LTS became the backbone of the embedded and mobile worlds, too: Android devices, TVs and routers standardized on LTS kernels, and the -stable team\'s discipline (Greg Kroah-Hartman\'s in particular) turned "out-of-tree vendor kernels" into something closer to "mainline plus patches".' ],
    links: [ ['Long-term support kernels', 'https://www.kernel.org/category/releases.html'], ['RHEL 6', 'https://en.wikipedia.org/wiki/Red_Hat_Enterprise_Linux'] ] },

  { date: '2011-06-15', era: 'takeover', kind: 'event', title: 'Chromebooks ship', summary: 'Acer and Samsung\'s first Chromebooks arrive — Linux laptops with zero Linux configuration.', facts: [
    'Billed as "nothing but the browser"',
    'By 2023, more than 40% of US classroom laptops',
    'Crostini later brings full Linux containers to them' ],
    more: [
      'The first Chromebooks — the Acer AC700 and Samsung Series 5 — went on sale on 15 June 2011, following Google\'s Cr-48 pilot laptop. Under the hood: the Linux kernel, a locked-down userspace, verified boot, and an update model that patched machines silently in the background — a laptop that behaved more like a service than a machine.',
      'The market initially shrugged. Then education arrived: schools discovered a $250 laptop that couldn\'t get viruses, didn\'t need imaging, and woke up in three seconds. By the late 2010s Chromebooks were routinely the best-selling devices in US K-12, and periodically the best-selling laptops overall — all of them, technically, Linux machines.',
      'For the kernel, Chrome OS became another major upstream contributor: Google\'s engineers have sent fixes across the tree, and Chrome OS\'s container support (Crostini) and VM architecture keep pushing mainline features. The "year of the Linux desktop" arrived quietly, wearing a Chrome logo.' ],
    links: [ ['Chromebook', 'https://en.wikipedia.org/wiki/Chromebook'], ['Crostini (Linux on Chrome OS)', 'https://en.wikipedia.org/wiki/ChromeOS#Crostini'] ] },

  { date: '2011-07-21', version: '3.0', era: 'takeover', kind: 'release', title: 'Twenty years: Linux 3.0', summary: 'The numbering jumps to 3.0 for the kernel\'s 20th birthday — with no break in compatibility.', facts: [
    'Linus: "the numbers are getting too big"',
    'Btrfs lands as "ready for testing", not yet default',
    'The 20th-anniversary party was at LinuxCon in Vancouver' ],
    more: [
      'Linux 3.0, released on 21 July 2011, marked twenty years of the kernel with a purely cosmetic version bump — as Linus put it when announcing the renumbering, "the numbers are getting too big", and since the minor version was already at 2.6.39, a third digit made more sense. Nothing broke; nothing was meant to.',
      'The 3.x decade that followed is remembered for steady, massive hardening: better power management for laptops, btrfs entering the tree (as a promising, if never-quite-default, filesystem), and a continuous stream of hardware enablement as ARM SoCs exploded.',
      'The twentieth anniversary also prompted retrospective inventory: the kernel now ran most of the internet\'s servers, all Android phones, and the majority of embedded devices — a scale that the 1991 Usenet post\'s author, still maintainer after two decades, described as beyond anything he had imagined.' ],
    links: [ ['Linux 3.0 (kernelnewbies)', 'https://kernelnewbies.org/Linux_3.0'], ['The 20-year retrospective coverage', 'https://en.wikipedia.org/wiki/Linux#History'] ] },

  { date: '2012-02-29', era: 'takeover', kind: 'event', title: 'Raspberry Pi', summary: 'A $35 Linux computer sells millions, then tens of millions — the best-selling computer ever made.', facts: [
    'Boots the Linux kernel on a Broadcom BCM2835',
    'Reignited hardware hacking for a generation',
    'Over 60 million units sold' ],
    more: [
      'The Raspberry Pi launched on 29 February 2012 at $35 — an ARM11 board running the Linux kernel that Eben Upton\'s Cambridge team had developed to entice students back into low-level computing. It sold out instantly, back-ordered for months, and eventually passed 60 million units, making it the best-selling computer of all time.',
      'The kernel angle is often overlooked: the Pi\'s magic was the union of a cheap SoC with a mainline-ish Linux stack — USB, HDMI, networking, Python — that made industrial control, education, media centres and hobby products trivially buildable. Its early kernel forks gradually converged upstream, following the same path as Android.',
      'The Pi also changed who wrote kernel code: thousands of makers got their first taste of cross-compiling, device trees, and driver patching on Pi hardware, seeding a new generation of embedded Linux engineers. For cost of a textbook, anyone could run — and hack on — the kernel.' ],
    links: [ ['Raspberry Pi', 'https://en.wikipedia.org/wiki/Raspberry_Pi'], ['Sales and milestones', 'https://en.wikipedia.org/wiki/Raspberry_Pi#Hardware'] ] },

  { date: '2012-12-10', version: '3.7', era: 'takeover', kind: 'release', title: 'One kernel for every ARM', summary: 'Multi-platform ARM support merges — one kernel binary boots dozens of ARM systems.', facts: [
    'Ended the "Android kernel fork" chaos, one SoC at a time',
    'Device trees replace board files',
    'Critical for phone, tablet and server ARM adoption' ],
    more: [
      'By 2012, ARM had a problem: every chip vendor shipped a forked kernel, and none of it went upstream. Linux 3.7 (December 2012) marked the culmination of Arnd Bergmann\'s multi-platform effort — a single ARM kernel binary that could boot on dozens of different systems, thanks to runtime device-tree hardware description replacing compile-time board files.',
      'The change was herculean: years of cleaning up SoC code, converting platforms to the flattened device tree format, and bulldozing platform assumptions out of the ARM port. It ended the era in which "Android kernel" meant "a fork we can never merge".',
      'The payoff is the modern ARM ecosystem: one kernel runs on phones, TVs, servers and SBCs; Android\'s Generic Kernel Image depends on it; and ARM servers became viable because mainline, not vendor forks, carried the platform. It remains one of the kernel\'s largest ever refactoring sagas.' ],
    links: [ ['Multi-platform ARM (kernelnewbies)', 'https://kernelnewbies.org/Linux_3.7'], ['Device tree', 'https://en.wikipedia.org/wiki/Devicetree'], ['ARM architecture support', 'https://en.wikipedia.org/wiki/Linux_kernel#Architecture'] ] },

  { date: '2013-09-25', era: 'takeover', kind: 'event', title: 'SteamOS announced', summary: 'Valve announces SteamOS and Steam Machines — another attempt to plant Linux in the living room.', facts: [
    'A Debian-derived gaming OS, later reborn as Arch-based SteamOS 3',
    'The Proton compatibility layer follows in 2018',
    'The 2022 Steam Deck made it finally stick' ],
    more: [
      'Valve\'s September 2013 announcement of SteamOS — a Linux-based console operating system, with Steam Machines hardware partners to follow — was framed by Gabe Newell\'s fear of closed platforms. Whatever the motives, it put serious money and intent behind gaming on Linux, historically the platform\'s weakest area.',
      'The technical breakthrough came in 2018: Proton, a Wine-derived compatibility layer built into Steam, translated Windows games to run on Linux with near-native performance — including DirectX-to-Vulkan translation. Suddenly the "no games" objection eroded, because thousands of Windows titles ran unmodified.',
      'SteamOS 1.0\'s Debian base eventually gave way to an Arch-based, rolling SteamOS 3, and in February 2022 the Steam Deck — a Linux handheld — shipped to enormous success. The kernel gained a major consumer platform, Valve gained an escape from Microsoft, and Linux gaming went from punchline to market segment.' ],
    links: [ ['SteamOS', 'https://en.wikipedia.org/wiki/SteamOS'], ['Proton', 'https://en.wikipedia.org/wiki/Proton_(software)'], ['Steam Deck', 'https://en.wikipedia.org/wiki/Steam_Deck'] ] },

  { date: '2014-03-18', era: 'everywhere', kind: 'event', title: 'Android Wear', summary: 'Google extends Android to wristwatches — the Linux kernel now ticks on your wrist.', facts: [
    'Built on the same kernel as phones and TVs',
    'Wear OS outlives every smartwatch rival\'s platform',
    'Linux in watches, routers, TVs, cars, fridges…' ],
    more: [
      'Android Wear, announced on 18 March 2014, extended the Android stack to wristwatches — and, by extension, put the Linux kernel on millions of wrists. The engineering problem was extreme: an OS designed for phones had to survive on batteries a fraction the size, with displays that sleep and radios that dream.',
      'The kernel\'s answer was years of power-management refinement: runtime PM, aggressive suspend frameworks, and the "wakeup sources" model that Android helped drive upstream. A smartwatch is, in kernel terms, a masterclass in sleeping everything that can sleep.',
      'Wear OS (as it became in 2018) ultimately outlived every rival smartwatch platform — webOS watches, Tizen, Pebble — largely because it rode Android\'s ecosystem. It stands as the emblem of a larger truth: the kernel had become the default substrate for any "smart" device, from watches to TVs to cars.' ],
    links: [ ['Wear OS', 'https://en.wikipedia.org/wiki/Wear_OS'], ['Linux in embedded devices', 'https://en.wikipedia.org/wiki/Linux#Embedded_devices'] ] },

  { date: '2014-06-09', era: 'everywhere', kind: 'event', title: 'Docker 1.0', summary: 'Containers — cgroups and namespaces, ten years in the making — become the developer default.', facts: [
    'Docker is a UX layer on kernel primitives, not a VM',
    'Kubernetes follows in 2015; the cloud reshapes around it',
    '"Built in 10 years, shipped in 10 minutes"' ],
    more: [
      'Docker 1.0 arrived on 9 June 2014, and with it the container era. The kernel primitives — namespaces and cgroups — had been accumulating in mainline since 2002 and 2008 respectively; Docker\'s contribution was packaging them into a developer-experience so clean ("docker run") that containers became the default unit of software delivery almost overnight.',
      'The consequences reshaped computing. Kubernetes (open-sourced 2014, 1.0 in 2015) built orchestration on the same primitives and became the operating system of the cloud; every major cloud vendor now bills by the container; and the kernel\'s namespaces, cgroups and overlay filesystems went from niche features to the most-exercised code paths in the datacenter.',
      'It is the clearest example of the kernel\'s slow-then-sudden pattern: a decade of unglamorous infrastructure work (mostly by engineers at Google, IBM, Parallels and others) created the substrate for a revolution that, in the end, looked like it happened in an afternoon.' ],
    links: [ ['Docker', 'https://en.wikipedia.org/wiki/Docker_(software)'], ['Kubernetes', 'https://en.wikipedia.org/wiki/Kubernetes'], ['Operating-system-level virtualization', 'https://en.wikipedia.org/wiki/OS-level_virtualization'] ] },

  { date: '2015-04-12', version: '4.0', era: 'everywhere', kind: 'release', title: 'Live patching', summary: 'Linux 4.0 introduces live kernel patching — fix security holes without a reboot.', facts: [
    'kGraft and kpatch converge on a common infrastructure',
    'Uptime-sensitive servers patch mid-flight',
    'The 4.x era brings years of steady hardening' ],
    more: [
      'Linux 4.0 (April 2015) merged the kernel live-patching infrastructure — the convergence of SUSE\'s kGraft and Red Hat\'s kpatch — allowing critical security fixes to be applied to a running kernel without rebooting. For systems with years of uptime, or fleets that simply could not all reboot at once, it changed the security calculus.',
      'The feature\'s real story is the collaboration: two competing corporate implementations (SUSE\'s and Red Hat\'s) were deliberately merged into one infrastructure, with the vendors agreeing on shared semantics rather than shipping incompatible forks — a model case of the kernel\'s "compete upstream, cooperate in mainline" culture.',
      'The 4.x era as a whole (2015–2019) was one of consolidation: live patching, io_uring\'s precursors, KASAN and KCOV debug infrastructure, and relentless hardening — the unglamorous work that made the kernel trustworthy for everything from nuclear plants to phones.' ],
    links: [ ['Kernel live patching', 'https://en.wikipedia.org/wiki/Ksplice'], ['LWN on the merged infrastructure', 'https://lwn.net/Articles/665359/'] ] },

  { date: '2016-04-08', era: 'everywhere', kind: 'event', title: 'Falcon 9 sticks the landing', summary: 'SpaceX lands a first stage at sea — its flight computers run a stripped-down Linux.', facts: [
    'Three x86 cores running Linux with fault tolerance',
    'Same recipe flies Crew Dragon to the ISS',
    'The kernel now operates in orbit' ],
    more: [
      'When the first stage of a Falcon 9 settled onto the drone ship "Of Course I Still Love You" on 8 April 2016, it was also a milestone for the kernel: SpaceX\'s flight computers are x86 machines running a stripped-down Linux, with triple redundancy and voting to survive radiation-induced bit flips.',
      'The design philosophy mirrors the kernel\'s own: cheap commodity parts, massive redundancy in software, and rapid iteration. Merlin engine control, the autogenous pressurization, and Crew Dragon\'s displays all run variants of the same stack — and the same approach flies astronauts to the International Space Station.',
      'From Starlink satellites (thousands of Linux machines in orbit) to Mars helicopters (whose ground systems run Linux), the kernel has quietly become the default OS of spaceflight — a long way from a Finnish student\'s hobby, and proof of the design\'s reach.' ],
    links: [ ['SpaceX Merlin and avionics', 'https://en.wikipedia.org/wiki/SpaceX_Merlin'], ['Starlink', 'https://en.wikipedia.org/wiki/Starlink'] ] },

  { date: '2016-08-02', era: 'everywhere', kind: 'event', title: 'Bash on Windows', summary: 'Microsoft ships a full Ubuntu userspace inside Windows 10 — "Linux on the desktop", in a twist nobody predicted.', facts: [
    'Windows Subsystem for Linux, announced at Build 2016',
    'Genuine kernel work follows with WSL2',
    'A decade of "Linux desktop year" jokes resolved sideways' ],
    more: [
      'At Build 2016, Microsoft demoed Bash running unmodified Ubuntu binaries on Windows 10. The Windows Subsystem for Linux translated Linux syscalls into NT kernel operations — an astonishing pivot from the company that had spent the 1990s and 2000s treating Linux as an existential threat.',
      'WSL2 (2019) went further: a genuine Linux kernel, maintained by Microsoft, running in a lightweight utility VM, with file-system performance and system-call fidelity that made real Linux tooling (and Docker, and systemd) work on Windows. Microsoft now maintains kernels and submits patches to mainline.',
      'For kernel developers, WSL is a case study in gravitational economics: when millions of developers demand Linux tooling, even the incumbent has to ship it. The "year of Linux on the desktop" arrived — as a feature of Windows.' ],
    links: [ ['Windows Subsystem for Linux', 'https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux'], ['Microsoft on upstreaming', 'https://lwn.net/Articles/845535/'] ] },

  { date: '2016-12-11', version: '4.9', era: 'everywhere', kind: 'release', title: 'A monster LTS', summary: 'Linux 4.9 becomes the most-adopted LTS ever — Android devices, IoT and millions of servers run it for years.', facts: [
    'First kernel with an extended 6-year support window',
    'TCP BBR congestion control and KASAN came later in 4.x',
    'Android 9/10 devices standardised on it' ],
    more: [
      'Linux 4.9 (December 2016) shipped with Google\'s BBR congestion control (a rethinking of TCP that models the network rather than loss), Greybus support from Project Ara, and the usual enormous driver flood. But its historical weight comes from maintenance: it became a long-term-support kernel, and in 2021 its support was extended to six years — the first kernel to carry a window that long.',
      'The reason was scale: Android devices standardized on 4.9 for the Android 9 and 10 generations, and fleets of IoT and embedded products built on it will be patched well into the 2020s. For years it was plausibly the most-deployed individual kernel release in history.',
      '4.9 also illustrates the LTS bargain: a kernel frozen for years must still track a world of changing security threats. The -stable process\'s response — backporting mitigations for a decade — is why "old kernel" stopped meaning "insecure kernel".' ],
    links: [ ['4.9 LTS support extension', 'https://www.kernel.org/'], ['TCP BBR', 'https://en.wikipedia.org/wiki/TCP_congestion_control#BBR'] ] },

  { date: '2017-11-13', era: 'everywhere', kind: 'event', title: '100% of the Top500', summary: 'Every supercomputer on the Top500 list — all 500 — now runs the Linux kernel.', facts: [
    'Windows dropped off the list entirely in 2017',
    'Summit, Sierra and later Frontier: exascale Linux',
    'The last UNIX supercomputer holdouts converted' ],
    more: [
      'The November 2017 Top500 list contained a statistical footnote that made history: for the first time, all 500 of the world\'s fastest supercomputers ran Linux. Windows\'s last supercomputer entries had dwindled to a handful; the free kernel had taken the entire high-performance computing field.',
      'The march had taken about fifteen years — from Beowulf\'s commodity clusters through IBM\'s BlueGene (running its own Linux stack), to Linux-dominant systems from Cray, Lenovo, and HPE. Today\'s leaders (Frontier, El Capitan, Fugaku) run Linux on hundreds of thousands of cores.',
      'HPC is the kernel\'s most demanding crucible: exascale machines push every subsystem — schedulers, networking (InfiniBand/RDMA), parallel filesystems (Lustre) — to physical limits, and their requirements flow straight back into mainline. Supercomputing is now simply a Linux workload.' ],
    links: [ ['TOP500', 'https://en.wikipedia.org/wiki/TOP500'], ['Linux and the Top500', 'https://en.wikipedia.org/wiki/Supercomputer#Operating_systems'] ] },

  { date: '2018-01-03', era: 'everywhere', kind: 'event', title: 'Meltdown & Spectre', summary: 'Two hardware design flaws force emergency kernel rewrites — page-table isolation ships in weeks.', facts: [
    'Google Project Zero\'s disclosure upended the industry',
    'KPTI, retpolines and new mitigations landed at speed',
    'Security hardening accelerated for years afterward' ],
    more: [
      'On 3 January 2018, researchers disclosed Meltdown and Spectre — attacks exploiting speculative execution to read kernel memory from user space. The flaws were in the hardware, but the defenses were the kernel\'s job: kernel page-table isolation (KPTI), retpoline compiler techniques, and dozens of follow-on mitigations for a family of side channels (Foreshadow, MDS, L1TF…) that occupied kernel developers for years.',
      'The response was a demonstration of the kernel\'s maturity under fire: patches were developed in secret across vendors for months (with some chaotic public fallout, as Linux distributions and Intel coordinated), and merged into mainline at a pace that made emergency releases the norm for a while. Performance costs — measurable on some workloads — drove optimization work for years.',
      'The deeper legacy is architectural: the kernel adopted an assumption of adversarial user space at the hardware level, accelerating work on things like secret-free memory management, constant-time primitives, and hardening infrastructure that continues today.' ],
    links: [ ['Meltdown', 'https://meltdownattack.com/'], ['Spectre', 'https://spectreattack.com/'], ['Kernel page-table isolation', 'https://en.wikipedia.org/wiki/Kernel_page-table_isolation'] ] },

  { date: '2018-12-16', era: 'everywhere', kind: 'event', title: 'The apology', summary: 'Linus takes a leave to work on his temper; the kernel adopts a Code of Conduct. He returns a better maintainer.', facts: [
    'His email: "I am going to take time off and get help"',
    'The CoC debate reshaped project governance',
    '4.19 LTS shipped around the same milestone' ],
    more: [
      'In September 2018, Linus Torvalds announced an immediate leave of absence to "take a break" and work on his communication style, prompted in part by a pointed essay by developer Sage Sharp and years of accumulated complaints about the kernel\'s abrasive culture. Weeks later, the project adopted a Code of Conduct — a governance shift as significant as any technical change.',
      'Linus\'s return email in November 2018 was studied in its plainness: he acknowledged his behavior had driven people away, said he was getting professional help, and asked the community to hold him accountable. The episode became a widely cited case study in open-source governance and leadership.',
      'The kernel that emerged was not softer about technical quality, but structurally different: maintainership diversified, conduct enforcement became real, and the project\'s culture debates moved from mailing-list flame wars to documented process — changes that arguably contributed to the kernel\'s continued growth over the following decade.' ],
    links: [ ['Linus\'s leave-of-absence email (coverage)', 'https://lwn.net/Articles/766503/'], ['The kernel Code of Conduct', 'https://www.kernel.org/doc/html/latest/process/code-of-conduct.html'] ] },

  { date: '2019-03-03', version: '5.0', era: 'frontier', kind: 'release', title: 'Linux 5.0', summary: 'Another numbering milestone — and the 5.x decade that makes Linux the substrate of everything.', facts: [
    'ARMv8.2, initial Radeon FreeSync, swapfiles on btrfs',
    'The version number, again, is just housekeeping',
    '5.x releases arrive roughly every 9–10 weeks' ],
    more: [
      'Linux 5.0 (March 2019) was, like 3.0 and 4.0 before it, a numbering event without a technical cliff: Linus bumped the version because 4.21 seemed silly. The release itself was solid but unremarkable — which was precisely the point. The kernel\'s development had become a metronome: a merge window, a release, every nine to ten weeks, forever.',
      'The 5.x era that followed became the kernel\'s most infrastructure-rich period: io_uring (5.1), exFAT and lockdown (5.4), and enormous growth in security tooling, Rust groundwork, and hardware enablement for the laptop, phone and cloud markets.',
      'The numbering trivia conceals the real story: by 2019, version numbers no longer marked "eras" because there was only one era — the kernel as universal substrate, shipping constantly, everywhere, to everyone.' ],
    links: [ ['Linux 5.0 (kernelnewbies)', 'https://kernelnewbies.org/Linux_5.0'], ['The release cadence', 'https://www.kernel.org/category/releases.html'] ] },

  { date: '2019-05-05', version: '5.1', era: 'frontier', kind: 'release', title: 'io_uring', summary: 'Jens Axboe\'s io_uring reimagines async I/O — the biggest storage interface change in decades.', facts: [
    'Submission/completion rings replace syscall-per-operation',
    'Nginx, Node.js and databases rewrote their I/O paths',
    'The future of high-performance storage on Linux' ],
    more: [
      'io_uring, merged in Linux 5.1 (May 2019), was Jens Axboe\'s answer to a thirty-year-old problem: Unix\'s asynchronous I/O interfaces were awkward, slow, or both. His design — a pair of shared ring buffers for submitting and completing I/O, batched and syscall-free in the common case — was so much faster that applications rebuilt their entire I/O stacks around it.',
      'The interface grew relentlessly: network I/O, file operations, chained requests, polling modes, registered buffers. Databases (PostgreSQL, RocksDB), proxies (nginx), and language runtimes (Node\'s libuv) adopted it; the POSIX AIO API that io_uring effectively obsoleted had waited two decades for a proper replacement.',
      'io_uring\'s growth also carries the modern kernel\'s security tension: a powerful shared-memory interface is a rich attack surface, and its history includes a string of sandbox-escape vulnerabilities. The kernel spent the following years adding restrictions and hardening — the price of being the fastest game in town.' ],
    links: [ ['io_uring', 'https://en.wikipedia.org/wiki/Io_uring'], ['Axboe\'s design notes', 'https://kernel.dk/io_uring.pdf'] ] },

  { date: '2019-11-24', version: '5.4', era: 'frontier', kind: 'release', title: 'exFAT at last', summary: 'Microsoft\'s exFAT goes mainline, plus lockdown mode for secure boot integrity.', facts: [
    'USB sticks and camera cards finally first-class',
    'Lockdown mode ties kernel trust to secure boot',
    'Microsoft had contributed exFAT spec to the OIN ecosystem' ],
    more: [
      'Linux 5.4 (November 2019) merged a clean-room implementation of Microsoft\'s exFAT filesystem, ending a decade of legal limbo in which the filesystem used by every SD card and many USB drives could not legally ship in mainline. The path was remarkable: Samsung\'s old driver had leaked under the GPL in 2013; Microsoft, as part of its broader open-source détente, published the specification and even joined the OIN patent-peace network; and the community rewrote the driver cleanly.',
      'The same release landed "lockdown" mode, a security feature that restricts kernel capabilities when secure boot is active — closing the long-standing "secure boot is meaningless if root can patch the kernel" hole, after years of sometimes-contentious design debate.',
      '5.4 also became a heavily used LTS kernel, chosen by Android 11 and countless embedded products — the kernel version that carried the ecosystem\'s early-2020s mainstream.' ],
    links: [ ['exFAT in Linux', 'https://en.wikipedia.org/wiki/ExFAT#Linux'], ['Kernel lockdown mode (LWN)', 'https://lwn.net/Articles/756220/'] ] },

  { date: '2020-05-12', era: 'frontier', kind: 'event', title: 'Windows embraces Linux', summary: 'WSL2 ships: a real Linux kernel inside Windows, with Microsoft submitting mainline patches.', facts: [
    'Full Linux kernel in a lightweight VM, GPU accelerated',
    'Microsoft contributed ext4, ARM and virtualization patches',
    'The "Linux on the desktop" irony lands' ],
    more: [
      'Windows Subsystem for Linux 2, released with Windows 10 2004 in May 2020, crossed a line the Halloween memos had made unthinkable: Windows now shipped a genuine Linux kernel, in a lightweight VM, with near-native performance, GPU acceleration, and — later — systemd support. Not a syscall translator: a real kernel.',
      'Microsoft\'s kernel involvement deepened in kind: the company hired kernel developers, contributed patches across the tree (virtualization, ARM, networking), ran Linux CI at scale, and even published its own CBL-Mariner Linux distribution. The competitive logic had inverted — developers wanted Linux tooling, so Windows had to carry it.',
      'WSL2 became one of the most popular ways to run the kernel, full stop — an endpoint few in 1998 would have predicted, and a reminder that infrastructure follows demand rather than ideology.' ],
    links: [ ['WSL2', 'https://learn.microsoft.com/en-us/windows/wsl/'], ['Announcement and architecture', 'https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux'] ] },

  { date: '2020-08-02', version: '5.8', era: 'frontier', kind: 'release', title: 'One of the largest ever', summary: 'Linux 5.8 packs one of the largest change sets ever — 900+ contributors and a record commit count.', facts: [
    'One of the biggest releases ever by contributors and commits',
    'New Intel/AMD hardware enablement galore',
    'Signal eventfd, new fanotify super-block watch, ID-mapped mounts groundwork',
    '~100M lines of change including headers' ],
    more: [
      'Linux 5.8 (August 2020) stood out even by the kernel\'s generous standards: roughly 900 contributors and one of the largest commit counts ever recorded, spanning new hardware enablement, security work, and core subsystem changes. Linus described it as one of the largest releases of all time.',
      'The release showcased the kernel\'s peculiar modern scale problem: individual releases were now larger than entire historical versions, and the coordination machinery — maintainer hierarchy, linux-next, continuous integration, the merge-window discipline — had become as important as the code.',
      '5.8\'s feature list reads like a cross-section of the industry\'s state: new AMD and Intel graphics silicon, further kernel-address-sanitizer work, eventfd for signals, and the groundwork for id-mapped mounts — the infrastructure of the containerized, virtualized, security-paranoid 2020s.' ],
    links: [ ['Linux 5.8 (kernelnewbies)', 'https://kernelnewbies.org/Linux_5.8'], ['Release statistics (LWN)', 'https://lwn.net/Articles/826983/'] ] },

  { date: '2020-12-13', version: '5.10', era: 'frontier', kind: 'release', title: 'The 20-year kernel', summary: 'Linux 5.10 LTS is committed to support until 2031 — a decade of care for embedded and industry.', facts: [
    'Chosen for countless embedded and automotive products',
    'Hardened: hardened usercopy, KASLR improvements',
    'The kernel you will find in cars and gateways' ],
    more: [
      'Linux 5.10 (December 2020) was designated LTS with the usual five-year horizon — and then, unusually, extended to 2031 by the Civil Infrastructure Platform\'s "super long term support" program. The kernel powering industrial control, medical devices and cars will now be maintained for a decade.',
      'The choice reflected where the kernel lives: embedded products have multi-decade certification cycles, and the industry needed a stable target that would keep receiving security fixes. 5.10 became the standard kernel of automotive Linux (via SUSE\'s and others\' ELTS-style programs), industrial gateways, and much of the IoT.',
      'The release itself was hardened accordingly — hardened usercopy, improved KASLR, safer defaults — reflecting the demands of industries where a kernel bug is not a crash but a regulatory event.' ],
    links: [ ['Civil Infrastructure Platform LTS', 'https://www.cip-project.org/'], ['5.10 LTS', 'https://www.kernel.org/'] ] },

  { date: '2021-05-09', version: '5.13', era: 'frontier', kind: 'release', title: 'Apple Silicon', summary: 'Linux 5.13 brings early support for Apple M1 Macs — the kernel follows users to new hardware.', facts: [
    'Marcan\'s Asahi Linux effort made it usable',
    'Open-source GPU driver stack followed in later releases',
    'Proof the community can out-port any vendor' ],
    more: [
      'When Apple abandoned Intel for its own M1 silicon in 2020, conventional wisdom said Linux-on-Mac was dead: no documentation, no vendor cooperation, a custom boot architecture. Hector Martin\'s Asahi Linux project nonetheless produced bootable M1 Linux within months, and basic support entered mainline in Linux 5.13 (June 2021).',
      'What followed was one of the community\'s great reverse-engineering efforts: the M1\'s GPU got a fully open-source driver (merged in later releases), audio, power management and more were decoded without vendor help, and Apple\'s hardware ran mainline Linux better than its own OS ran some alternatives.',
      'The episode demonstrated the kernel\'s distinctive strength — a worldwide community that ports first and asks questions later — and gave a new generation of developers a hands-on kernel education.' ],
    links: [ ['Asahi Linux', 'https://asahilinux.org/'], ['Apple silicon and Linux', 'https://en.wikipedia.org/wiki/Macintosh_Linux'] ] },

  { date: '2021-08-25', era: 'frontier', kind: 'event', title: 'Linux turns 30', summary: 'Three decades from "hobby" to the foundation of the internet, phones, cloud and spaceflight.', facts: [
    'From 10,239 lines to the most-deployed software project in history',
    'Tens of thousands of contributors over the years',
    '"I did not imagine anything this big" — Linus, 30 years on' ],
    more: [
      'On 25 August 2021, the kernel turned thirty. The inventory at the birthday: most of the internet\'s servers, all Android phones, every major cloud, all 500 fastest supercomputers, millions of embedded devices, spacecraft and cars — by most measures the most widely deployed piece of software in human history.',
      'The scale had become difficult to overstate: on the order of a billion lines changed across 30 years, tens of thousands of contributors, an estimated development value in the tens of billions of dollars, and a governance model (benevolent dictator, trusted subsystem maintainers, cryptographic releases) that had survived every growth spurt and every crisis.',
      'Linus\'s own reflections at the anniversary were characteristically understated: he had set out to make a terminal emulator, then a better Minix, and never imagined the scale. The hobby that would not be "big and professional like gnu" had become the largest professional software project ever mounted.' ],
    links: [ ['30 years of Linux (kernel.org)', 'https://www.kernel.org/'], ['History of Linux', 'https://en.wikipedia.org/wiki/History_of_Linux'] ] },

  { date: '2022-10-02', version: '6.0', era: 'frontier', kind: 'release', title: 'Linux 6.0', summary: 'The 6.x era opens with a new major number — RISC-V maturity and memory-tiering work begins.', facts: [
    'RISC-V matures; NUMA-aware memory tiering work begins',
    'Again, just numbering — but a nice excuse for a party',
    'The kernel grew past 30 million lines' ],
    more: [
      'Linux 6.0 (October 2022) continued the now-traditional cosmetic major bump. Behind the number, the release tracked the industry\'s movements: RISC-V support kept maturing toward real hardware, CXL-adjacent memory tiering work began, and the usual hardware enablement flowed in.',
      'By 6.0 the kernel\'s statistics had become almost abstract: over 30 million lines, thousands of contributors per release, an ecosystem of companies whose collective investment defies accounting. The version number had long since stopped tracking anything except the merge-window rhythm.',
      'The 6.x era\'s defining projects were already in flight — Rust integration, the real-time kernel\'s final push, scheduler rewrites — setting the stage for a remarkably consequential sequence of releases.' ],
    links: [ ['Linux 6.0 (kernelnewbies)', 'https://kernelnewbies.org/Linux_6.0'], ['RISC-V support', 'https://en.wikipedia.org/wiki/RISC-V'] ] },

  { date: '2022-12-11', version: '6.1', era: 'frontier', kind: 'release', title: 'Rust comes to the kernel', summary: 'Linux 6.1 merges initial Rust support — memory-safe drivers are now a first-class possibility.', facts: [
    'Miguel Ojeda\'s Rust-for-Linux patchset lands',
    'Rust drivers (network, GPU) follow in 6.2+',
    'The most-discussed kernel change in a decade' ],
    more: [
      'Linux 6.1 (December 2022) merged the initial Rust infrastructure — the toolchain wiring, core abstractions and a sample driver — after two years of debate. Miguel Ojeda\'s Rust-for-Linux project had argued for years that memory-safe languages could coexist with C in the kernel without a rewrite, and the merge made the kernel the highest-profile C project to adopt Rust.',
      'The cultural battle was as hard as the technical one: integrating a second language into a 30-million-line C codebase raised questions of toolchain, architecture support, maintenance burden and taste. Linus\'s pragmatic verdict — let\'s see how it goes in real drivers — set the tone.',
      'What followed validated the experiment: Rust drivers appeared across the tree (null_blk, Android binder bindings, network and GPU drivers), and by mid-decade Rust was a routine, if still carefully bounded, part of kernel development. The "rewrite it in Rust" wars would continue elsewhere — but inside the kernel, the question had become *how much*, not *whether*.' ],
    links: [ ['Rust for Linux', 'https://rust-for-linux.com/'], ['Rust in the kernel (LWN series)', 'https://lwn.net/Articles/978738/'], ['Rust', 'https://en.wikipedia.org/wiki/Rust_(programming_language)'] ] },

  { date: '2023-10-23', version: '6.6', era: 'frontier', kind: 'release', title: 'The workhorse LTS', summary: 'Linux 6.6 LTS becomes the backbone for embedded, Android and cloud fleets for years to come.', facts: [
    'The EEVDF scheduler replaces CFS here',
    'Signed with long-term embedded support commitments',
    'Android 15 and countless devices standardise on it' ],
    more: [
      'Linux 6.6 (October 2023) landed as LTS with all the usual industrial commitments — but its headline was internal: the Completely Fair Scheduler, the kernel\'s CPU scheduler since 2007, was replaced by EEVDF (Earliest Eligible Virtual Deadline First), a design from the 1990s literature finally implemented by Peter Zijlstra. The 33-year-old CFS algorithm exited mainline.',
      'EEVDF\'s advantage was fairness with latency guarantees: instead of heuristics, it used virtual deadlines to give interactive and latency-sensitive workloads deterministic treatment — an important change for desktops, audio work and containerized cloud workloads alike.',
      'As an LTS, 6.6 became the standard kernel for Android 15 and a whole generation of embedded and server products — the "boring" release that will quietly run the world\'s fleets for years.' ],
    links: [ ['EEVDF scheduler (LWN)', 'https://lwn.net/Articles/962418/'], ['Linux 6.6 (kernelnewbies)', 'https://kernelnewbies.org/Linux_6.6'] ] },

  { date: '2024-11-17', version: '6.12', era: 'frontier', kind: 'release', title: 'Real time, for real', summary: 'PREEMPT_RT merges — after 20 years of patches, Linux is a fully mainline real-time kernel.', facts: [
    'Deterministic latencies for robotics, audio and industry',
    'Thomas Gleixner\'s 20-year magnum opus',
    'No more out-of-tree RT patches to carry' ],
    more: [
      'In November 2024, Linux 6.12 merged PREEMPT_RT — the real-time preemption model that had existed as out-of-tree patches since 2004. After two decades of work led by Thomas Gleixner, the kernel could finally offer bounded, deterministic scheduling latencies as a first-class, mainline configuration.',
      'The technical achievement was subtle: real-time is not "faster", it is *predictable* — the worst case, not the average, matters. Getting there required reworking locking (RT-mutexes everywhere), making hundreds of code paths preemptible, and untangling years of assumptions baked into drivers and core code.',
      'The users are unglamorous and critical: industrial controllers, audio production, robotics, medical devices, and anything where a missed deadline is a failure. The merge also ended an era — the longest-running out-of-tree patchset in kernel history, finally home.' ],
    links: [ ['PREEMPT_RT', 'https://en.wikipedia.org/wiki/PREEMPT_RT'], ['The merge announcement (LWN)', 'https://lwn.net/Articles/992028/'] ] },

  { date: '2025-03-09', version: '6.14', era: 'frontier', kind: 'release', title: 'Steady refinement', summary: 'Linux 6.14 continues the rhythm: NTSYNC for Wine, faster mounts, endless driver enablement.', facts: [
    'NTSYNC driver improves Windows-app emulation sync',
    'Hardware enablement: newest AMD and Intel silicon',
    'The merge-window rhythm hums along' ],
    more: [
      'Linux 6.14 (March 2025) exemplified the mature kernel\'s rhythm: an NTSYNC driver implementing Windows synchronization primitives (finally making Wine and Proton\'s emulation of Windows games dramatically more accurate), faster mount operations for container-heavy workloads, and the endless, essential flood of new hardware enablement.',
      'The NTSYNC work is a quiet landmark for Linux gaming: by implementing Windows-style mutexes, semaphores and events natively in the kernel, it removed one of the largest performance bottlenecks in the Proton compatibility layer that powers the Steam Deck and desktop Linux gaming.',
      'Releases like 6.14 rarely make headlines, but they are the kernel\'s true texture: a nine-week cadence of improvements, each individually small, collectively responsible for the kernel\'s relentless fitness.' ],
    links: [ ['Linux 6.14 (kernelnewbies)', 'https://kernelnewbies.org/Linux_6.14'], ['NTSYNC and Proton (coverage)', 'https://lwn.net/Articles/964104/'] ] },

  { date: '2025-07-27', version: '6.16', era: 'frontier', kind: 'release', title: 'Linux 6.16', summary: 'Confidential computing, better schedulers and the usual flood of new hardware support.', facts: [
    'Intel TDX and AMD SEV guest improvements',
    'Continued Rust growth: more in-kernel Rust infrastructure',
    'Release cadence remains ~10 weeks' ],
    more: [
      'Linux 6.16 (July 2025) carried the kernel\'s expanding role in confidential computing — AMD SEV-SNP and Intel TDX improvements letting guests prove their memory is encrypted and unobservable, even from the host. As "confidential cloud" becomes a product category, the kernel is its foundation.',
      'Rust infrastructure continued to grow, more drivers landed for the newest silicon, and the release maintained the rhythm: merge window, stabilization, release, repeat. The kernel\'s ability to absorb enormous change continuously — rather than in disruptive rewrites — remains its most underrated engineering property.',
      'By this point the kernel\'s scale was roughly 40 million lines and rising, with around 15,000 contributors a year and subsystems maintained by a distributed hierarchy that spans hundreds of companies.' ],
    links: [ ['Linux 6.16 (kernelnewbies)', 'https://kernelnewbies.org/Linux_6.16'], ['Confidential computing', 'https://en.wikipedia.org/wiki/Confidential_computing'] ] },

  { date: '2025-09-28', version: '6.17', era: 'frontier', kind: 'release', title: 'The 32-bit chapter closes', summary: 'Linux 6.17 removes 32-bit x86 support — the architecture Linux was born on says farewell.', facts: [
    'i386 support dropped after 34 years of service',
    '64-bit only on x86 from here on',
    'The original 386 target, finally retired' ],
    more: [
      'In September 2025, Linux 6.17 removed 32-bit x86 support, ending a 34-year relationship with the architecture where the kernel was born. The i386 — a CPU Linus bought on credit in 1991 — had been retired from the kernel after outliving every successor\'s expectations.',
      'The removal was procedural rather than dramatic: 32-bit x86 hardware was long obsolete, its users had long since migrated, and carrying the legacy mode had real maintenance cost. ARM 32-bit survives for the embedded world; x86 moves forward as 64-bit only.',
      'It is a fitting bookend: the kernel that started as a 386 project outgrew the 386 by three decades and thirty million lines. The architecture\'s retirement is, in a sense, the kernel\'s graduation ceremony.' ],
    links: [ ['x86-32 removal (LWN)', 'https://lwn.net/Articles/1017906/'], ['i386 history', 'https://en.wikipedia.org/wiki/Intel_80386'] ] },

  { date: '2026-04-12', version: '7.0', era: 'frontier', kind: 'release', title: 'The seventh major number', summary: 'Linus announces Linux 7.0 in February and ships it in April — "solid progress", the usual numbering housekeeping.', facts: [
    'Announced 8 Feb 2026; released 12 April 2026 as "solid progress"',
    'A safer kmalloc() lands after years of API-design debate',
    'Ships as the default kernel of Ubuntu 26.04 LTS' ],
    more: [
      'On 8 February 2026 Linus Torvalds announced that the release then in development would be published as Linux 7.0 — the fourth cosmetic major renumbering (3.0, 4.0, 5.0, 6.0 having come before), motivated, as ever, by version numbers growing awkward rather than any technical cliff. It shipped on schedule on 12 April 2026, described by Linus as a marker of "solid progress" rather than a feature overhaul.',
      'The release carried substantial work regardless: a redesigned I/O error-reporting pipeline that finally replaced a long-standing limitation in how block-layer errors reached user space, and a safer kmalloc() API — the product of years of debate about making the kernel\'s most fundamental allocation call harder to misuse, which landed in 7.0 after lengthy review.',
      '7.0 also marked hardware milestones: Intel Nova Lake and Crescent Island accelerator bring-up, TSX defaulting to auto mode, AMD graphics IP blocks enabled, and continued ARM, RISC-V and LoongArch growth. Its largest visible endorsement came three weeks later: Ubuntu 26.04 LTS shipped 7.0 as its default kernel, and kernel-side ROCm work finally let AMD\'s GPU compute stack be packaged natively.' ],
    links: [ ['Linux 7.0 (kernelnewbies)', 'https://kernelnewbies.org/Linux_7.0'], ['Linus\'s 7.0 announcement', 'https://lore.kernel.org/lkml/CAHk-=wj2WqpPBwpAXo8bj_Hx-NxKMRVTVMUaQis7+Vm6XLRZiw@mail.gmail.com/'], ['A safer kmalloc() for 7.0 (LWN)', 'https://lwn.net/Articles/1062856/'] ] },

  { date: '2026-06-14', version: '7.1', era: 'frontier', kind: 'release', title: 'NTFS, and a great unburdening', summary: 'Linux 7.1 lands a four-years-in-the-making native NTFS driver — and cuts 140,000 lines of legacy code.', facts: [
    'New native NTFS driver — four years in the making, full write support',
    'Intel FRED exception delivery enabled by default',
    'Over 140,000 lines of legacy code removed (486 subarches, PCMCIA, ISDN)' ],
    more: [
      'The headline of Linux 7.1 (released 14 June 2026) was a completely rewritten in-kernel NTFS filesystem, four years in development and built on the modern iomap and folio infrastructure with delayed allocation — replacing, for most users, the FUSE-based NTFS-3G that had bridged the Windows-world gap since 2006, and ending the kernel\'s long read-only-or-FUSE era for NTFS volumes.',
      'The release was equally notable for subtraction: over 140,000 lines of legacy code were cut, including the x86 486-era sub-architecture support (a direct descendant of the machine Linux 0.01 booted on), obsolete PCMCIA controllers and ISDN drivers. The kernel\'s growing habit of aggressive cleanup — driven in part by the need to keep the AI-assisted flood of changes reviewable — claimed UDP Lite support and broke some legacy network configurations by design.',
      'Elsewhere: Intel\'s FRED (Flexible Return and Event Delivery) — an architectural redesign of exception and interrupt handling — was enabled by default on Panther Lake and newer silicon; Landlock gained a new access right for pathname UNIX domain sockets; and the release shipped with around 13,000 non-merge changesets, a typically enormous cycle in the 7.x rhythm.' ],
    links: [ ['Linux 7.1 (kernelnewbies)', 'https://kernelnewbies.org/Linux_7.1'], ['9to5Linux release coverage', 'https://9to5linux.com/linux-kernel-7-1-officially-released-heres-whats-new'], ['NTFS in the kernel', 'https://en.wikipedia.org/wiki/NTFS'] ] },

  { date: '2026-08-16', version: '7.2', era: 'frontier', kind: 'release', title: 'Cache-aware everything', summary: 'Linux 7.2 brings cache-aware load balancing, USB4STREAM and a busy cycle of performance work.', facts: [
    'Cache-aware load balancing: co-schedules tasks sharing an LLC',
    'USB4STREAM: high-speed data streams over USB4 cables',
    'AMDGPU gains initial HDMI 2.1 FRL support' ],
    more: [
      'Linux 7.2, released on 16 August 2026, was one of the busiest development cycles in recent memory. Its centerpiece was cache-aware task scheduling: the scheduler learned to co-locate tasks that share data within the same last-level-cache domain, a direct attack on the memory-bottleneck problems of modern many-core CPUs — and a significant win for datacenter workloads.',
      'The release also introduced Intel\'s USB4STREAM protocol for streaming data over USB4 cables between systems (file transfers, debugging, system-to-system networking), a "fair(er)" GPU scheduler that was — in a very kernel-story twist — reverted back to the older DRM FIFO scheduler late in the cycle after the new default showed a regression, and initial HDMI 2.1 FRL support in AMDGPU, a milestone long complicated by HDMI spec licensing restrictions.',
      'Memory management got a raft of work: better MGLRU reclaim, the fourth phase of the swap-table rework, multi-size transparent huge pages for khugepaged, and large folios by default on Btrfs. Security gained Landlock control over UDP sockets, IMA measurement staging outside the kernel, and compiler-assisted slab-cache partitioning — plus Rust support for the IBM S/390 mainframe architecture.' ],
    links: [ ['Linux 7.2 (kernelnewbies)', 'https://kernelnewbies.org/Linux_7.2'], ['Phoronix feature overview', 'https://www.phoronix.com/review/linux-72-features'], ['9to5Linux release coverage', 'https://9to5linux.com/linux-kernel-7-2-officially-released-this-is-whats-new'] ] },

  { date: '2026-09-20', era: 'frontier', kind: 'event', title: 'Today — and tomorrow', summary: 'The kernel runs your phone, your cloud, your car and the spacecraft overhead. 7.3 is in -rc; 7.4 is already queuing.', facts: [
    '~41 million lines of code; thousands of contributors per release',
    '7.2 stable, 7.3 in -rc; Ubuntu 26.04 LTS ships 7.0 by default',
    'Every Android device, every major cloud, all 500 fastest supercomputers' ],
    more: [
      'The 2026 kernel is the substrate of the technosphere: every Android device, every major cloud provider\'s infrastructure, all 500 fastest supercomputers, most embedded products, and a growing fleet of spacecraft. Roughly 41 million lines, maintained by a community of thousands of engineers, most of them paid by companies whose competitive interests align, for once, on keeping the shared kernel good.',
      'The defining story of the 7.x era so far is artificial intelligence — in both directions. AI/LLM coding agents now find bugs at a rate that has overwhelmed subsystem maintainers and contributed unprecedented patch churn (Linus flagged the 7.3 cycle as notably heavier because of it), while projects across the ecosystem wrestle with contribution policy: a Void Linux maintainer famously orphaned over a hundred packages over the question, and the kernel community continues to negotiate how machine-generated code can be trusted and reviewed.',
      'Meanwhile the Rust transformation keeps deepening — Ubuntu completed its migration to Rust coreutils in 26.10, Google is removing the C binder driver in favor of Rust — and the open questions remain the interesting ones: how far Rust will reach, how safety-certifiable Linux can become, and what a post-x86 world will demand. What has not changed is the mechanism: a merge window, a maintainer hierarchy, and a Finnish engineer\'s refusal to accept patches that make the code worse.' ],
    links: [ ['Linux kernel', 'https://en.wikipedia.org/wiki/Linux_kernel'], ['The kernel development community (docs)', 'https://www.kernel.org/doc/html/latest/process/'], ['kernel.org', 'https://www.kernel.org/'] ] },

  { date: '2026-10-25', era: 'frontier', kind: 'event', title: 'Linux 7.3 — closing in', summary: 'In development: -rc4 now, stable expected late October. AMD Zen 6, stable Nova Lake graphics — and the heaviest AI churn yet.', facts: [
    'In development: -rc4 now; stable expected in late October 2026',
    'AMD Zen 6 enablement; Intel Xe3P "Nova Lake" graphics declared stable',
    'Tree passes 41M lines as AI/LLM patch churn reshapes development' ],
    more: [
      'Linux 7.3 is working through its release-candidate cycle toward a stable release in the second half of October 2026 — and its story is as much sociological as technical. In the 7.3-rc1 announcement, Linus noted the tree had grown to just shy of 41 million lines and that the cycle was heavier than usual, driven substantially by AI/LLM coding agents both uncovering countless bugs and assisting in authoring patches. The networking subsystem\'s maintainers were, in their own words, completely overwhelmed by the volume of AI-generated contributions.',
      'Technically, 7.3 continues the big arcs: AMD Zen 6 client enablement, Intel Xe3P "Nova Lake" integrated graphics declared stable and enabled by default, initial support for Apple M3 Pro/Max/Ultra, initial enablement for IBM Power12 (with PowerPC gaining in-kernel Rust), and a driver for the 2026 Steam Controller. Storage work is substantial: notable Btrfs performance improvements, faster small-I/O paths for PCIe Gen5 NVMe, and a new FailFS filesystem complementing the NULLFS driver merged last cycle.',
      'Latency and gaming get direct attention too — x86/mm improvements for latency-sensitive workloads, scheduler tweaks for hybrid CPUs, and better graphics performance on systems with limited video memory — while obsolete drivers keep being removed to keep the AI-era churn reviewable.' ],
    links: [ ['Phoronix 7.3 feature overview', 'https://www.phoronix.com/review/linux-73-features'], ['7.3-rc1 and the code stats', 'https://www.phoronix.com/news/Linux-7.3-rc1-Code-Stats'], ['Networking maintainers and the AI flood', 'https://www.phoronix.com/news/Linux-7.3-Networking'] ] },

  { date: '2026-12-20', era: 'frontier', kind: 'event', title: 'Linux 7.4 — already queuing', summary: 'The merge window has not opened yet, but subsystem branches are already stacking a 39% faster file open.', facts: [
    'Merge window opens after 7.3; release expected around January 2027',
    'VFS: do_open() optimization makes file opens up to 39% faster',
    'A 36-line patch, two years in the making by Mateusz Guzik' ],
    more: [
      'Even before Linux 7.3 ships, its successor is accumulating work: maintainers queue changes into subsystem branches named for the next release (vfs-7.4.lookup and friends), so the merge window can open and close in a frantic two weeks. The 7.4 branch already contains a celebrated example: Mateusz Guzik\'s optimization of do_open(), the VFS path walked every time a file is opened, which removes a duplicative dentry reference and nets up to 39% more open operations per second on the will-it-scale benchmark — a 36-line patch, five revisions, more than two years in the making.',
      '7.4\'s queue also carries the removal of the ancient BFS filesystem, and — per Google\'s announcement — the retirement of the "painful to maintain" C binder driver in favor of the Rust implementation, another landmark in the kernel\'s language transition. If the traditional cadence holds, stable 7.4 lands around the turn of 2027.',
      'The pattern is the kernel\'s quiet genius: the release rhythm never stops, the future is assembled incrementally in public branches, and "next version" is always already under construction — exactly as it has been since 0.01.' ],
    links: [ ['The do_open() optimization', 'https://www.phoronix.com/news/Linux-7.4-Faster-Do-Open'], ['The VFS 7.4 branch', 'https://git.kernel.org/pub/scm/linux/kernel/git/vfs/vfs.git/'], ['Guzik\'s patch series', 'https://lore.kernel.org/all/20260803125138.1937674-1-mjguzik@gmail.com/'] ] },
];
