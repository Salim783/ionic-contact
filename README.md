# Gestion de Contacts

## Étapes de Développement

1. **Configurer le projet Ionic**
   - Installer Ionic CLI : `npm install -g @ionic/cli`
   - Créer un nouveau projet : `ionic start gestion-contact blank`
   - Générer les pages nécessaires :
     - `ionic generate page contacts`
     - `ionic generate page add-contact`
     - `ionic generate page edit-contact`


2. **Créer les modèles**
   - Créer un fichier `contact.model.ts` dans `src/app/models`.
   - Ajouter les propriétés suivantes :
   - `id` : `number`
   - `name` : `string`
   - `email` : `string`
   - `phone` : `number`


   
3. **Créer les services**
   - Créer un fichier `contact.service.ts` et `theme.service.ts` dans `src/app/services`.
   - Implémenter les méthodes CRUD.
   - Implémenter les méthodes de gestion des thèmes.

4. **Implémenter le stockage local dans `contact.service.ts`**
   - Utiliser le module Storage d'Ionic pour stocker les contacts localement:
   - 'npm install @ionic/storage-angular'
   - 'npm install @angular/forms'

5. **Construire l'interface utilisateur**
   - Concevoir et implémenter l'UI pour les pages de contacts et de détails des contacts.

6. **Tester l'application**
   - Tester toutes les fonctionnalités de l'application.
   - Vérifier que l'application fonctionne correctement sur différents appareils.

## Processus de Déploiement

1. **Compiler l'application**
   - Exécuter `ionic build` pour compiler l'application.

2. **Déployer sur un serveur web**
   - Copier le contenu du dossier `www` vers un serveur web.

3. **Utiliser une plateforme de déploiement**
   - Vous pouvez utiliser des plateformes comme Netlify, Vercel ou autre pour déployer votre application.

Pour plus d'informations, consultez la [documentation Ionic](https://ionicframework.com/docs).
